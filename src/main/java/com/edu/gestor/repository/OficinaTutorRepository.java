package com.edu.gestor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.gestor.model.OficinaTutor;
import com.edu.gestor.model.OficinaTutorId;

public interface OficinaTutorRepository extends JpaRepository<OficinaTutor, OficinaTutorId> {
}
