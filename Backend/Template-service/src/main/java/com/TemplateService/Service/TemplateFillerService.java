package com.TemplateService.Service;

import com.TemplateService.DTO.FilledTemplateDTO;
import com.TemplateService.DTO.StudentDTO;
import com.TemplateService.Entity.IDCardTemplate;
import com.TemplateService.feing.StudentClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class TemplateFillerService {

    private final StudentClient studentClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public TemplateFillerService(StudentClient studentClient) {
        this.studentClient = studentClient;
    }

    private static final Pattern PLACEHOLDER_PATTERN = Pattern.compile("\\{\\{(.*?)\\}\\}");

    // Fill template for one student
    public FilledTemplateDTO fillTemplateForStudent(IDCardTemplate template, StudentDTO student) {
        try {
            // Convert Map -> JSON string -> JsonNode
            JsonNode root = objectMapper.readTree(objectMapper.writeValueAsString(template.getElementsJson()));
            String jsonString = root.toString();
            jsonString = replacePlaceholders(jsonString, student);
            return new FilledTemplateDTO(student.getId(), jsonString);
        } catch (Exception e) {
            throw new RuntimeException("Error filling template: " + e.getMessage(), e);
        }
    }

    // Fill template for all students of a course
    public List<FilledTemplateDTO> fillTemplateForCourse(IDCardTemplate template, Long courseId) {
        List<StudentDTO> students = studentClient.getStudentsByCourse(courseId);
        List<FilledTemplateDTO> results = new ArrayList<>();
        for (StudentDTO student : students) {
            results.add(fillTemplateForStudent(template, student));
        }
        return results;
    }

    // Replace placeholders with student data
    private String replacePlaceholders(String text, StudentDTO student) {
        Matcher matcher = PLACEHOLDER_PATTERN.matcher(text);
        StringBuffer sb = new StringBuffer();

        while (matcher.find()) {
            String key = matcher.group(1).trim();
            String value = switch (key) {
                case "id" -> String.valueOf(student.getId());
                case "firstName" -> student.getFirstName();
                case "lastName" -> student.getLastName();
                case "fullName" -> student.getFullName();
                case "fatherName" -> student.getFatherName();
                case "rollNo" -> student.getRollNo();
                case "enrollmentNo" -> student.getEnrollmentNo();
                case "programName" -> student.getProgramName();
                case "admissionBatch" -> student.getAdmissionBatch();
                case "studentPhoto" -> student.getStudentPhoto();
                case "status" -> student.getStatus();
                case "courseId" -> String.valueOf(student.getCourseId());
                default -> "";
            };

            matcher.appendReplacement(sb, value != null ? Matcher.quoteReplacement(value) : "");
        }

        matcher.appendTail(sb);
        return sb.toString();
    }
}
