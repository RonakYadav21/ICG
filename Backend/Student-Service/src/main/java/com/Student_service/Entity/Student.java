package com.Student_service.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Personal Details
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(name = "father_name", nullable = false, length = 100)
    private String fatherName;

    @Column(name = "email_address", nullable = false, unique = true, length = 100)
    private String emailAddress;

    @Column(name = "phone_no", nullable = false, unique = true, length = 15)
    private String phoneNo;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "address", length = 250)
    private String address;

    // Academic Details
    @Column(name = "enrollment_no", nullable = false, unique = true, length = 50)
    private String enrollmentNo;

    @Column(name = "program_name", nullable = false, length = 100)
    private String programName;

    @Column(name = "roll_no", nullable = false, unique = true, length = 50)
    private String rollNo;

    @Column(name = "admission_batch", nullable = false, length = 20)
    private String admissionBatch;

    // ✅ Add courseId column
    @Column(name = "course_id", nullable = false)
    private Long courseId;

    // Other Details
    @Column(name = "student_photo", nullable = false, length = 500)
    private String studentPhoto; // Cloudinary URL

    @Column(name = "status", nullable = false, length = 20)
    private String status = "Pending"; // default value

    @Column(name = "digital_card_url", length = 500)
    private String digitalCardUrl = ""; // initially empty
}