package com.edu.gestor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.gestor.model.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, Integer> {
}
