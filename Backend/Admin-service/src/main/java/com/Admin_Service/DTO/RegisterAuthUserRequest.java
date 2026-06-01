package com.Admin_Service.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterAuthUserRequest {
    private String username; // email
    private String password;
    private String role; // e.g., "ROLE_STUDENT", "ROLE_COMPANY"
    private String status;
}
