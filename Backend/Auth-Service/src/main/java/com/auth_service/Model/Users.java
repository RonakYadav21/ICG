package com.auth_service.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data  // ✅ Add this to auto-generate getters, setters, toString, etc.
@NoArgsConstructor
@AllArgsConstructor
@Builder  // ✅ This is required to enable Users.builder()

public class Users {  // ✅ Make the class public

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    private String role;

    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String status;

}