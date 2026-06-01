package com.api_gateway.jwtutil;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
@Value("${jwt.secret}")
private String secretKey;

public boolean isTokenValid(String token) {
	try {
		
		Claims claims = extractAllClaims(token);
		return claims.getExpiration().after(new Date());
	}catch(Exception e) {
		return false;
	}
}

public  Claims extractAllClaims(String token) {
Key key=Keys.hmacShaKeyFor(secretKey.getBytes());//Creates a cryptographic signing key for JWT verification.
return Jwts.parserBuilder()//Create a JWT parser
		.setSigningKey(key)   // 2. Provide the secret key (used to verify signature)
		.build()
        .parseClaimsJws(token)// 3. Parse and validate the token
        .getBody() ;  // 4. Extract the claims (payload)
}

public String extractRole(String token) {
	return extractAllClaims(token).get("role",String.class);
}

public String extractUsername(String token) {
    return extractAllClaims(token).getSubject();
}
}
