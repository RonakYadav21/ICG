package com.Admin_Service.controller;

import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.Admin_Service.DTO.AdminStatusEvent;
import com.Admin_Service.DTO.DashboardResponse;
import com.Admin_Service.Entity.Admin;
import com.Admin_Service.Messaging.RabbitMQConfig;
import com.Admin_Service.service.AdminService;

@RestController
@RequestMapping("/Admin")
public class adminController {

    @Autowired
    private AdminService adminservice;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    // =========================
    // SIGNUP
    // =========================
    @PostMapping("/signup")
    public ResponseEntity<?> adminsignup(
            @RequestBody Admin admin
    ) {
        admin.setPassword(
                passwordEncoder.encode(admin.getPassword())
        );

        Admin response = adminservice.Register(admin);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/stats")
    public DashboardResponse getStats() {

        return adminservice.getDashboardStats();
    }

    // =========================
    // GET PENDING ADMINS
    // =========================
    @GetMapping("/pending-admins")
    public List<Admin> getPendingAdmins() {

        return adminservice.getPendingAdmins();
    }

    // =========================
    // APPROVE ADMIN
    // =========================
    @PutMapping("/approve/{id}")
    public Admin approveAdmin(
            @PathVariable Long id
    ) {

        // UPDATE STATUS IN DATABASE
        Admin admin = adminservice.approveAdmin(id);

        // CREATE EVENT
        AdminStatusEvent event =
                new AdminStatusEvent(
                        admin.getEmail(),
                        admin.getStatus()
                );

        // SEND EVENT TO RABBITMQ
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE,
                RabbitMQConfig.ROUTING_KEY,
                event
        );

        return admin;
    }

    // =========================
    // REJECT ADMIN
    // =========================
    @PutMapping("/reject/{id}")
    public Admin rejectAdmin(
            @PathVariable Long id
    ) {

        // UPDATE STATUS IN DATABASE
        Admin admin = adminservice.rejectAdmin(id);

        // CREATE EVENT
        AdminStatusEvent event =
                new AdminStatusEvent(
                        admin.getEmail(),
                        admin.getStatus()
                );

        // SEND EVENT TO RABBITMQ
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE,
                RabbitMQConfig.ROUTING_KEY,
                event
        );

        return admin;
    }
}