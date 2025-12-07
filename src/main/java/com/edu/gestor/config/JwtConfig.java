package com.edu.gestor.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.security.SecureRandom;
import java.util.Base64;

@Configuration
public class JwtConfig {

    @Bean
    public String jwtSecret() {
        byte[] key = new byte[64]; 
        new SecureRandom().nextBytes(key);
        return Base64.getEncoder().encodeToString(key);
    }
}

