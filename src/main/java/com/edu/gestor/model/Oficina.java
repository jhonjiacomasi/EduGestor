package com.edu.gestor.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "oficina")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Oficina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_oficina")
    private Integer id;

    @Column(name = "tema", nullable = false, length = 150)
    private String tema;

    @Column(name = "data_oficina", nullable = false)
    private LocalDate dataOficina;

    @ManyToOne
    @JoinColumn(name = "id_professor", nullable = false)
    private Professor professorResponsavel;

    @ManyToOne
    @JoinColumn(name = "id_tutor")
    private Tutor tutor; // opcional

    @ManyToMany
    @JoinTable(
        name = "oficina_alunos",
        joinColumns = @JoinColumn(name = "id_oficina"),
        inverseJoinColumns = @JoinColumn(name = "id_aluno")
    )
    private List<Aluno> alunos;

}
