package com.edu.gestor.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

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

	public void setIdOficina(Integer id2) {
		
	}
}
