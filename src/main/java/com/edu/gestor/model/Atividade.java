package com.edu.gestor.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "atividade")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Atividade {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_atividade")
	private Integer id;

	@Column(name = "descricao", nullable = false, length = 255)
	private String descricao;

	@ManyToOne
	@JoinColumn(name = "id_oficina", nullable = false)
	private Oficina oficina;
}
