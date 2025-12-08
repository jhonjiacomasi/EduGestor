package com.edu.gestor.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "escola")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Escola {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEscola;

    @Column(length = 255)
    private String nomeEscola;

    @Column(length = 255)
    private String endereco;

    @Column(length = 255)
    private String cidade;

    @Column(length = 2)
    private String estado; 
}