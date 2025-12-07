package com.edu.gestor.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.edu.gestor.model.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserDetailsImpl implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final User user;

	// 🔑 OBTENÇÃO DE AUTORIDADES (ROLES)
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// O Spring Security exige o prefixo "ROLE_" para autoridades
		String roleName = user.getRole().name();
		return List.of(new SimpleGrantedAuthority("ROLE_" + roleName));
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}