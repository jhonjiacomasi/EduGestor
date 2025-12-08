package com.edu.gestor.model;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate; // Importe LocalDate

@Entity
@Table(name = "inscricao") // O Hibernate pode ter criado 'oficina_aluno'. Considere renomear a tabela para 'inscricao' no banco, ou manter a anotação @Table(name = "oficina_aluno")
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


    @Column(nullable = false)
    private Boolean presencaConfirmada = false; 
    @Column(unique = true, length = 64) 
    private String codigoCertificado; 

    @Column(nullable = true)
    private LocalDate dataEmissao; 

  
}