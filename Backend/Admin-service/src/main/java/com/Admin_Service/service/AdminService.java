package com.Admin_Service.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Admin_Service.DTO.RegisterAuthUserRequest;
import com.Admin_Service.Entity.Admin;
import com.Admin_Service.client.AuthClient;
import com.Admin_Service.repository.AdminRepository;
@Service
public class AdminService {
	@Autowired
	private AdminRepository adminrepo;

	@Autowired
	 private AuthClient authServiceClient;

	public Admin Register(Admin admin) {
		System.out.println(admin);
		 Admin savedadmin=	adminrepo.save(admin);
		  RegisterAuthUserRequest authUser = new RegisterAuthUserRequest();
		    authUser.setUsername(admin.getEmail());
		    authUser.setPassword(admin.getPassword());
		    authUser.setRole("ROLE_ADMIN");
		    authServiceClient.registerUser(authUser);
			return savedadmin;
		}

	
}
