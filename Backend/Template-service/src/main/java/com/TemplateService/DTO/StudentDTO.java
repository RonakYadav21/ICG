package com.TemplateService.DTO;


import lombok.Data;
import java.time.LocalDate;

@Data
public class StudentDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String fatherName;
    private String rollNo;
    private String enrollmentNo;
    private String programName;
    private String admissionBatch;
    private String studentPhoto;
    private String status;
    private String digitalCardUrl;
    private Long courseId;
    // Derived field — Full name
    public String getFullName() {
        return firstName + " " + lastName;
    }
}

