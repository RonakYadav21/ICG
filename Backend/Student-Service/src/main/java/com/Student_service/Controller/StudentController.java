package com.Student_service.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Student_service.Entity.Student;
import com.Student_service.Service.StudentService;
import com.Student_service.repository.StudentRepository;

import java.util.HashMap;
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

//  
    //  New endpoint
    @GetMapping("/by-course/{courseId}")
    public ResponseEntity<List<Student>> getStudentsByCourse(@PathVariable Long courseId) {
        List<Student> students = studentService.getStudentsByCourseId(courseId);
        return ResponseEntity.ok(students);
    }
    
    @GetMapping("/dashboard-stats")
    public Map<String, Long> getDashboardStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("totalStudents",
                studentRepository.count());

//        stats.put("pendingApprovals",
//                studentRepository.countByStatus("pending"));

        return stats;
    }
}