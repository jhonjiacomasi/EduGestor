package com.edu.gestor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.gestor.model.Escola;

public interface EscolaRepository extends JpaRepository<Escola, Integer> {
}
