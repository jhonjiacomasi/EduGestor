package com.edu.gestor.model;

import java.util.List;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAluno;

    private String nomeAluno;

    @ManyToOne
    @JoinColumn(name = "id_escola")
    private Escola escola;

    @ManyToMany(mappedBy = "alunos")
    private List<Oficina> oficinas;
}
