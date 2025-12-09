package com.edu.gestor.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "professor") 
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Professor { 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProfessor;

    @Column(length = 100, nullable = false)
    private String nomeProfessor;

    @Column(length = 100)
    private String email; 
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    
}