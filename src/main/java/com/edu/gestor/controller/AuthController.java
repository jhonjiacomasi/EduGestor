package com.edu.gestor.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
// ... outros imports
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.gestor.model.User;
import com.edu.gestor.model.dto.LoginRequest;
import com.edu.gestor.security.JwtUtils;
import com.edu.gestor.service.UserService; // ✅ Importar o Serviço de Negócio

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;
	private final UserService userService; // 🔑 Injetar o UserService

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateToken(authentication);
		return ResponseEntity.ok(Map.of("token", jwt));
	}

	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody User UserRequest) {

		User registeredUser = userService.registerNewUser(UserRequest);

		return ResponseEntity.status(201).body(registeredUser);
	}
}