package com.Student_service.Controller;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.Student_service.Entity.Student;
import com.Student_service.Service.StudentService;
import com.Student_service.repository.StudentRepository;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class StudentController {

    private final StudentRepository studentRepository;
    private final StudentService studentService;

   


    public StudentController(StudentRepository studentRepository,StudentService studentService) {
        this.studentService = studentService;

        this.studentRepository = studentRepository;
    }

    @PostMapping("/studentRegistration")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
        // Set default values
        student.setStatus("Pending");
        student.setDigitalCardUrl("");

        // Save student
        Student savedStudent = studentRepository.save(student);
        return ResponseEntity.ok(savedStudent);
    }
    
    @GetMapping("/checkStudent/{email}")
    public ResponseEntity<Map<String, Boolean>> checkStudent(@PathVariable String email) {
        boolean registered = studentService.isStudentRegistered(email);
        return ResponseEntity.ok(Map.of("registered", registered));
    }

}