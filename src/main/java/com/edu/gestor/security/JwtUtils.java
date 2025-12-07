package com.edu.gestor.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class JwtUtils {

	@Value("${app.jwt.secret}")
	private String jwtSecret;

	@Value("${app.jwt.expiration-ms}")
	private int jwtExpirationMs;

	private Key key() {
		// Garante que a chave é suficientemente longa (32 bytes para HS256)
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
				.signWith(key()).compact(); 
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
	        return true;
	    } catch (io.jsonwebtoken.security.SignatureException e) { 
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