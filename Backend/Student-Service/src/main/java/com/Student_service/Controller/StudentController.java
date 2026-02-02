package com.Student_service.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Student_service.Entity.Student;
import com.Student_service.Service.StudentService;
import com.Student_service.repository.StudentRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentRepository studentRepository;
    private final StudentService studentService;

    public StudentController(StudentRepository studentRepository, StudentService studentService) {
        this.studentRepository = studentRepository;
        this.studentService = studentService;
    }

    @PostMapping("/studentRegistration")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
//        student.setStatus("Pending");
//        student.setDigitalCardUrl("");
        Student savedStudent = studentRepository.save(student);
        return ResponseEntity.ok(savedStudent);
    }

//    @GetMapping("/checkStudent/{email}")
//    public ResponseEntity<Map<String, Boolean>> checkStudent(@PathVariable String email) {
//        boolean registered = studentService.isStudentRegistered(email);
//        return ResponseEntity.ok(Map.of("registered", registered));
//    }

    //  New endpoint
    @GetMapping("/by-course/{courseId}")
    public ResponseEntity<List<Student>> getStudentsByCourse(@PathVariable Long courseId) {
        List<Student> students = studentService.getStudentsByCourseId(courseId);
        return ResponseEntity.ok(students);
    }
}