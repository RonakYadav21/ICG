package com.Student_service.feign;

import com.Student_service.dto.RegisterAuthUserRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

// The name should match the AuthService's spring.application.name in its properties
@FeignClient(name = "AUTH-SERVICE")
public interface AuthClient {

    @PostMapping("/auth/register")
    ResponseEntity<String> registerUser(@RequestBody RegisterAuthUserRequest request);
}
