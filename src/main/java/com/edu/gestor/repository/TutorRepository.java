package com.edu.gestor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edu.gestor.model.Tutor;

public interface TutorRepository extends JpaRepository<Tutor, Integer> {
}
