package com.auth_service.SecuriyConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.auth_service.UserService.CustomUserDetailsService;


@Configuration
@EnableWebSecurity //Activates Spring Security.
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        // This obtains the AuthenticationManager from the spring  framework
        return config.getAuthenticationManager();
    }

   @Bean
   public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
   }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())//it turns off the built-in protection against Cross-Site Request
            .authorizeHttpRequests(auth -> auth  //The first auth is the parameter passed into the lambda   The second auth is calling methods like .requestMatchers()
            		   .requestMatchers("/swagger-ui.html",
            	                "/swagger-ui/**",
            	                "/v3/api-docs/**",
            	                "/auth/v3/api-docs",
            	                "/student/v3/api-docs",
            	                "/Admin/v3/api-docs",
            	                "/templates/v3/api-docs",
            	                "/auth/register", "/auth/login","/student/studentRegistration").permitAll()  
            		   .anyRequest().authenticated()
            )
            .userDetailsService(userDetailsService)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));//NO HTTP session will be created.

        return http.build();
    }
}
