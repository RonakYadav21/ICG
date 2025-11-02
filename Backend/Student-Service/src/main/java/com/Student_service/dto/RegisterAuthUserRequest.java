package com.Student_service.dto;

import lombok.Data;

@Data
public class RegisterAuthUserRequest {
 private String username;
 private String password;
 private String role;
}

