package com.edu.gestor.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {

    public static void main(String[] args) {
        
        String rawPassword = "senha123"; 

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(rawPassword);
        
        System.out.println("----------------------------------------");
        System.out.println("Senha em texto simples: " + rawPassword);
        System.out.println("HASH BCrypt para o DB: " + encodedPassword);
        System.out.println("----------------------------------------");
    }
}