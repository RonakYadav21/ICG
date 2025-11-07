package com.auth_service.DTO;

import lombok.Data;

@Data
public class RegisterAuthUserRequest {
 private String username; 
 private String password;
 private String role;
}
