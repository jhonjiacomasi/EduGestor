package com.edu.gestor.service;

import com.edu.gestor.model.Professor;
import com.edu.gestor.model.Role;
import com.edu.gestor.model.User;
import com.edu.gestor.repository.ProfessorRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService {

	private final ProfessorRepository repository;
	private final PasswordEncoder passwordEncoder;

	public ProfessorService(ProfessorRepository repository, PasswordEncoder passwordEncoder) {
		this.repository = repository;
		this.passwordEncoder = passwordEncoder;
	}

	public List<Professor> listarTodos() {
		return repository.findAll();
	}

	public Optional<Professor> buscarPorId(Integer id) {
		return repository.findById(id);
	}

	public Professor salvar(Professor professor) {
		User user = professor.getUser();

		if (user.getPassword() != null && !user.getPassword().isEmpty()) {
			String encodedPassword = passwordEncoder.encode(user.getPassword());
			user.setPassword(encodedPassword);
		}

		if (user.getRole() == null) {
			user.setRole(Role.PROFESSOR);
		}

		return repository.save(professor);
	}

	public void deletar(Integer id) {
		repository.deleteById(id);
	}
}