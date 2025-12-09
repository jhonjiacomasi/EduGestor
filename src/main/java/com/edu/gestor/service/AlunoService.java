package com.edu.gestor.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edu.gestor.model.Aluno;
import com.edu.gestor.model.Escola;
import com.edu.gestor.repository.AlunoRepository;
import com.edu.gestor.repository.EscolaRepository;

@Service
public class AlunoService {

	private final AlunoRepository repository;
	private final EscolaRepository escolaRepository;

	public AlunoService(AlunoRepository repository, EscolaRepository escolaRepository) {
		this.repository = repository;
		this.escolaRepository = escolaRepository;
	}

	public List<Aluno> listarTodos() {
		return repository.findAll();
	}

	public Optional<Aluno> buscarPorId(Integer id) {
		return repository.findById(id);
	}

	@Transactional
	public Aluno salvar(Aluno aluno) {
	    // Carregar a escola completa se tiver ID
	    if (aluno.getEscola() != null && aluno.getEscola().getIdEscola() != null) {
	        Escola escola = escolaRepository.findById(aluno.getEscola().getIdEscola())
	                .orElseThrow(() -> new RuntimeException("Escola não encontrada"));
	        aluno.setEscola(escola);
	    }

	    Aluno alunoSalvo = repository.save(aluno);
	    return repository.findByIdWithEscola(alunoSalvo.getIdAluno()).orElse(alunoSalvo);
	}

	public void deletar(Integer id) {
		repository.deleteById(id);
	}
}