package com.edu.gestor.model;

import java.util.List;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class Tutor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTutor;

    private String nomeTutor;
    private String email;

    @ManyToMany(mappedBy = "tutores")
    private List<Oficina> oficinas;
}