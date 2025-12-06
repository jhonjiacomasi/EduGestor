package com.edu.gestor.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tutor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tutor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tutor")
    private Integer id;

    @Column(name = "nome_tutor", nullable = false, length = 100)
    private String nomeTutor;

    @Column(name = "telefone", length = 20)
    private String telefone;

	public void setIdTutor(Integer id2) {
		// TODO Auto-generated method stub
		
	}
}