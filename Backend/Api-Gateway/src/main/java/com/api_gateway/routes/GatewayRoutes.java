package com.api_gateway.routes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.api_gateway.jwtutil.JwtAuthFilter;

@Configuration
public class GatewayRoutes {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()

        		//   .route("Auth-Service",r->r.path("/auth/**").uri("lb://AUTH-SERVICE"))
        		//    .route("template-Service",r->r.path("/templates/**").uri("lb://TEMPLATE-SERVICE"))
	        	//    .route("Student",r->r.path("/student/**").uri("lb://STUDENT-SERVICE"))
	        	//    .route("Admin-Signup", r -> r.path("/Admin/**")
	        	// 		   .uri("lb://ADMIN-SERVICE"))
            
        	.route("Auth-Service", r -> r.path("/auth/**")
			        .uri("https://auth-service-q7g9.onrender.com"))
			.route("Template-Service", r -> r.path("/templates/**")
			        .uri("https://template-service-p4tg.onrender.com"))
			.route("Student-Service", r -> r.path("/student/**")
			        .uri("https://student-service-wdtt.onrender.com"))
			.route("Admin-Service", r -> r.path("/Admin/**")
			        .uri("https://admin-service-43zb.onrender.com")

            .build();
    }
}
