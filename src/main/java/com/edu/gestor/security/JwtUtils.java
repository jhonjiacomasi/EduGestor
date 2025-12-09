package com.edu.gestor.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtils {

	@Value("${app.jwt.secret}")
	private String jwtSecret;

	@Value("${app.jwt.expiration-ms}")
	private int jwtExpirationMs;

	private Key key() {
		return Keys.hmacShaKeyFor(jwtSecret.getBytes()); 
	}

	public String generateToken(Authentication authentication) {
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

		String role = userDetails.getAuthorities().iterator().next().getAuthority();
        
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);

		return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
				.setIssuedAt(new Date()).setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(key(), SignatureAlgorithm.HS256).compact(); // Adicionando o algoritmo explícito
	}

	public String getUsernameFromToken(String token) {
		return Jwts.parserBuilder()
            .setSigningKey(key())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
	}

	public boolean validateToken(String authToken) {
	    try {
	    	Jwts.parserBuilder()
	        .setSigningKey(key()) 
	        .build() 
	        .parseClaimsJws(authToken);
	        return true; // Retorna true se o parse for bem-sucedido
	    } catch (SignatureException e) { 
            log.error("Assinatura JWT inválida: {}", e.getMessage());
	    } catch (MalformedJwtException e) {
	        log.error("Token JWT inválido: {}", e.getMessage());
	    } catch (ExpiredJwtException e) {
	        log.error("Token JWT expirado: {}", e.getMessage());
	    } catch (UnsupportedJwtException e) {
	        log.error("Token JWT não suportado: {}", e.getMessage());
	    } catch (IllegalArgumentException e) {
	        log.error("A string de claims JWT está vazia: {}", e.getMessage());
	    }
	    return false;
	}
}