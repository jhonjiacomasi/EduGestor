package com.edu.gestor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.gestor.model.Inscricao;
import com.edu.gestor.model.InscricaoId;

public interface InscricaoRepository extends JpaRepository<Inscricao, InscricaoId> {
}