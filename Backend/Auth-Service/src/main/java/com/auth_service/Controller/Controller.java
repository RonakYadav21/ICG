package com.auth_service.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth_service.DTO.JwtResponse;
import com.auth_service.DTO.LoginRequest;
import com.auth_service.DTO.RegisterAuthUserRequest;
import com.auth_service.Model.Users;
import com.auth_service.UserRepository.UserRepository;
import com.auth_service.UserService.CustomUserDetailsService;
import com.auth_service.util.JwtUtil;
@RestController
@RequestMapping("/auth")
public class Controller {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil  jwtUtil;
    
    @Autowired
    UserRepository userrepo;
    
    @Autowired
    PasswordEncoder passwordEncoder;
	
	  @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
	    	System.out.println(loginRequest.getUsername());
	    	System.out.println(loginRequest.getPassword());
	        try {
	            authenticationManager.authenticate(    //This is where SecurityConfig comes into play.
	                new UsernamePasswordAuthenticationToken(   
	                    loginRequest.getUsername(), loginRequest.getPassword())
	            );
	        } catch (BadCredentialsException e) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                                 .body("Invalid username or password");
	        }
	        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
	        final String jwt = jwtUtil.generateToken(userDetails);
	        return ResponseEntity.ok(new JwtResponse(jwt));
	    }
	
	 @PostMapping("/register")  // will be called when a user register in their micorservice  by that microservice
	    public ResponseEntity<?> register(@RequestBody RegisterAuthUserRequest request) {
	        if (userrepo.existsByUsername(request.getUsername())) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
	        }

	        Users user = Users.builder()
	            .username(request.getUsername())
	            .password(request.getPassword())
	            .role(request.getRole())
	            .build();

	        userrepo.save(user);

	        return ResponseEntity.ok("User registered in AuthService");
	    }
}
