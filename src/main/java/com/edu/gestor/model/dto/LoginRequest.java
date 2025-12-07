package com.edu.gestor.model.dto;

import com.edu.gestor.model.Role;

import lombok.Data;

@Data
public class LoginRequest {
	private String username;
	private String password;
	private Role role;
}