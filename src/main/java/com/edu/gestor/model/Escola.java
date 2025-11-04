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
public class Escola {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEscola;

    private String nomeEscola;
    private String endereco;
    private String cidade;
    private String estado;

    @OneToMany(mappedBy = "escola")
    private List<Aluno> alunos;
}