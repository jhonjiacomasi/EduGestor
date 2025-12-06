package com.edu.gestor.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "oficina_aluno")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inscricao {

    @EmbeddedId
    private InscricaoId id;

    @ManyToOne
    @MapsId("idOficina")
    @JoinColumn(name = "id_oficina")
    private Oficina oficina;

    @ManyToOne
    @MapsId("idAluno")
    @JoinColumn(name = "id_aluno")
    private Aluno aluno;
}

