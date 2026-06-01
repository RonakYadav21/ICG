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
	public RouteLocator routes(RouteLocatorBuilder builder) { //RouteLocator stores all API Gateway route definitions.
		return builder.routes()
				 //swagger ui 
				   .route("Student-Service-Swagger",
				           r -> r.path("/student/v3/api-docs")
				                   .uri("lb://STUDENT-SERVICE"))

				   .route("Auth-Service-Swagger",
				           r -> r.path("/auth/v3/api-docs")
				                   .uri("lb://AUTH-SERVICE"))

				   .route("Admin-Service", r -> r
						    .path("/Admin/**", "/v3/api-docs/Admin")
						    .uri("lb://ADMIN-SERVICE"))
				   
				   .route("Template-Service-Swagger",
				           r -> r.path("/templates/v3/api-docs")
				                   .uri("lb://TEMPLATE-SERVICE"))
				   
				
				
				//public routing
   .route("Auth-Service",r->r.path("/auth/**").uri("lb://AUTH-SERVICE"))
   .route("Student",r->r.path("/student/**").uri("lb://STUDENT-SERVICE"))
   .route("Admin-Signup", r -> r.path("/Admin/signup")
		   .uri("lb://ADMIN-SERVICE"))
	    
//			cloud endpoints 
//				.route("Auth-Service", r -> r.path("/auth/**")
//				        .uri("https://auth-service-q7g9.onrender.com"))
//				.route("Template-Service", r -> r.path("/templates/**")
//				        .uri("https://template-service-p4tg.onrender.com"))
//				.route("Student-Service", r -> r.path("/student/**")
//				        .uri("https://student-service-wdtt.onrender.com"))
//				.route("Admin-Service", r -> r.path("/Admin/**")
//				        .uri("https://admin-service-43zb.onrender.com"))
//				
//				      
				
   
   
   //swagger ui 
   .route("Student-Service-Swagger",
           r -> r.path("/student/v3/api-docs")
                   .uri("lb://STUDENT-SERVICE"))

   .route("Auth-Service-Swagger",
           r -> r.path("/auth/v3/api-docs")
                   .uri("lb://AUTH-SERVICE"))

   .route("Admin-Service", r -> r
		    .path("/Admin/**", "/v3/api-docs/Admin")
		    .uri("lb://ADMIN-SERVICE"))
   
   .route("Template-Service-Swagger",
           r -> r.path("/templates/v3/api-docs")
                   .uri("lb://TEMPLATE-SERVICE"))
   
   //protected routes
   
	   .route("template-Service-Protected", r -> r.path("/templates/**")
               .filters(f -> f.filter(jwtAuthFilter))
               .uri("lb://TEMPLATE-SERVICE"))
   
       .route("Admin-Service", r -> r.path("/Admin/**")
           .filters(f -> f.filter(jwtAuthFilter))
           .uri("lb://ADMIN-SERVICE"))
       .build();
  
}
}
