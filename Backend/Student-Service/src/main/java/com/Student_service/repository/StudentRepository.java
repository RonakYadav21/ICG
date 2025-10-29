package com.Student_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Student_service.Entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmailAddress(String emailAddress);

}