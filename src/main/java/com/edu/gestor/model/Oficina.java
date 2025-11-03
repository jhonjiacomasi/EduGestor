package com.edu.gestor.model;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Oficina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOficina;

    private String tema;
    private LocalDate data;
    private Boolean certificado;

    @ManyToOne
    @JoinColumn(name = "id_professor")
    private Professor professor;

    @ManyToMany
    @JoinTable(
        name = "oficina_tutor",
        joinColumns = @JoinColumn(name = "id_oficina"),
        inverseJoinColumns = @JoinColumn(name = "id_tutor")
    )
    private List<Tutor> tutores;

    @ManyToMany
    @JoinTable(
        name = "oficina_aluno",
        joinColumns = @JoinColumn(name = "id_oficina"),
        inverseJoinColumns = @JoinColumn(name = "id_aluno")
    )
    private List<Aluno> alunos;
}
