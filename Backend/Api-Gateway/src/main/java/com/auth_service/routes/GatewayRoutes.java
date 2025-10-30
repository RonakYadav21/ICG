package com.auth_service.routes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.auth_service.jwtutil.JwtAuthFilter;

@Configuration
public class GatewayRoutes {

	@Autowired
	private JwtAuthFilter jwtAuthFilter;
	
	@Bean
	public RouteLocator routes(RouteLocatorBuilder builder) {
		return builder.routes()
	   .route("Auth-Service",r->r.path("/auth/**").uri("lb://AUTH-SERVICE"))
//	   .route("Student-Signup",r->r.path("/Student/signup").uri("/lb://STUDENT-SERVICE"))
//	   .route("Admint-Signup", r -> r.path("/Admin/signup")
//               .uri("lb://ADMIN-SERVICE"))
//	   .route("Student-Service-Protected", r -> r.path("/Student/**")
//               .filters(f -> f.filter(jwtAuthFilter))
//               .uri("lb://STUDENT-SERVICE"))
//	   
//       .route("Admin-Service", r -> r.path("/Admin/**")
//           .filters(f -> f.filter(jwtAuthFilter))
//           .uri("lb://ADMIN-SERVICE"))

       .build();
}
	}

