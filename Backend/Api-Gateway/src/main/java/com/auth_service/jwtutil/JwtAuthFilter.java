package com.auth_service.jwtutil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;

import io.jsonwebtoken.Claims;
import jakarta.ws.rs.core.HttpHeaders;
import reactor.core.publisher.Mono;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthFilter implements GatewayFilter {

	@Autowired
	private JwtUtil jwtUtil;
	
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain){
		String path=exchange.getRequest().getURI().getPath();
		if(path.contains("/signup")|| path.contains("/login")||path.startsWith("/auth/")) {
			return chain.filter(exchange); //return to next filter
		}
		String authHeader=exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
		if(authHeader==null || !authHeader.startsWith("Bearer")) {
				exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
				return exchange.getResponse().setComplete();
		}
		
		String token = authHeader.substring(7);
		if(!jwtUtil.isTokenValid(token)) {
			exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
			return exchange.getResponse().setComplete();
		}
		 Claims claims = jwtUtil.extractAllClaims(token);
		 String role=claims.get("role",String.class);
		 if((path.startsWith("/Student")&&!role.equals("ROLE_STUDENT"))||(path.startsWith("/Admin/") && !role.equals("ROLE_ADMIN"))) {
			 exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
	            return exchange.getResponse().setComplete();
}
		 ServerHttpRequest modifiedRequest = exchange
				 .getRequest()
				 .mutate()
				 .header("X-User-Email", claims.getSubject())
				 .header("X-User-Role", role).build();
		 return chain.filter(exchange.mutate().request(modifiedRequest).build());
}
}
