package com.Admin_Service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.Admin_Service.DTO.RegisterAuthUserRequest;




@FeignClient(name ="AUTH-SERVICE")
public interface AuthServiceClient {

    @PostMapping("/auth/register")
    ResponseEntity<String> registerUser(@RequestBody RegisterAuthUserRequest request);
}
