package com.edu.gestor.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "aluno")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Aluno {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_aluno")
	private Integer id;

	@Column(name = "nome_aluno", nullable = false, length = 100)
	private String nomeAluno;

	@Column(name = "email", nullable = false, length = 120, unique = true)
	private String email;

	@Column(name = "telefone", length = 20)
	private String telefone;
}
