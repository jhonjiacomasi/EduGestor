package com.edu.gestor.service;

import com.edu.gestor.model.Professor;
import com.edu.gestor.repository.ProfessorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService {

	private final ProfessorRepository repository;

	public ProfessorService(ProfessorRepository repository) {
		this.repository = repository;
	}

	public List<Professor> listarTodos() {
		return repository.findAll();
	}

	public Optional<Professor> buscarPorId(Integer id) {
		return repository.findById(id);
	}

	public Professor salvar(Professor professor) {
		return repository.save(professor);
	}

	public void deletar(Integer id) {
		repository.deleteById(id);
	}
}