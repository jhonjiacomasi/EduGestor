package com.edu.gestor.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.edu.gestor.model.Aluno;

public interface AlunoRepository extends JpaRepository<com.edu.gestor.model.Aluno, Integer> {
	@Query("SELECT a FROM Aluno a JOIN FETCH a.escola WHERE a.idAluno = :id")
	Optional<Aluno> findByIdWithEscola(Integer id);

}
