package com.Student_service.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Student_service.Entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmailAddress(String emailAddress);

    // Fetch all students by course/program name
    List<Student> findByProgramNameIgnoreCase(String programName);
    List<Student> findByCourseId(Long courseId);
    long countByStatus(String status);
}