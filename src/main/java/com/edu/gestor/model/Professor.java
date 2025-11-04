package com.edu.gestor.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProfessor;

    private String nomeProfessor;
    private String email;

    @OneToMany(mappedBy = "professor")
    private List<Oficina> oficinas;
}