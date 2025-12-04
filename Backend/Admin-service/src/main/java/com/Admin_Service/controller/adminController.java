package com.Admin_Service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Admin_Service.Entity.Admin;
import com.Admin_Service.service.AdminService;

@RestController
@RequestMapping("/Admin")
public class adminController {

	@Autowired
	 private AdminService adminservice;
	@Autowired
	private PasswordEncoder passwordEncoder; 

	@PostMapping("/signup")
	public ResponseEntity<?> adminsignup (@RequestBody Admin admin){
		admin.setPassword(passwordEncoder.encode(admin.getPassword()));
		Admin response= adminservice.Register(admin);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
}
