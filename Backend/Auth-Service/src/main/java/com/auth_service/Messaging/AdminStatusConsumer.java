package com.auth_service.Messaging;

import java.util.Optional;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.auth_service.DTO.AdminStatusEvent;
import com.auth_service.Model.Users;
import com.auth_service.UserRepository.UserRepository;

@Component
public class AdminStatusConsumer {

    @Autowired
    private UserRepository userrepo;

    @RabbitListener(
            queues = "admin-status-queue"
    )
    public void receiveAdminStatus(
            AdminStatusEvent event
    ) {

        System.out.println("=================================");
        System.out.println("MESSAGE RECEIVED");
        System.out.println("EMAIL : " + event.getEmail());
        System.out.println("STATUS : " + event.getStatus());
        System.out.println("=================================");

        Optional<Users> optionalUser =
                userrepo.findByUsername(
                        event.getEmail()
                );

        System.out.println("USER FOUND ? " + optionalUser.isPresent());

        if (optionalUser.isPresent()) {

            Users user = optionalUser.get();

            System.out.println(
                    "OLD STATUS : " + user.getStatus()
            );

            user.setStatus(
                    event.getStatus()
            );

            userrepo.save(user);

            System.out.println(
                    "NEW STATUS : " + user.getStatus()
            );

            System.out.println(
                    "STATUS UPDATED SUCCESSFULLY"
            );
        }
        else {

            System.out.println(
                    "USER NOT FOUND IN AUTH DB"
            );
        }
    }
}