package com.Student_service.Service;

import org.springframework.stereotype.Service;

import com.Student_service.Entity.Student;
import com.Student_service.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student registerStudent(Student student) {
        // Set default values
        student.setStatus("Pending");
        student.setDigitalCardUrl("");

        // The studentPhoto is already provided as a URL from frontend
        return studentRepository.save(student);
    }

    public boolean isStudentRegistered(String email) {
        return studentRepository.findByEmailAddress(email).isPresent();
    }
}