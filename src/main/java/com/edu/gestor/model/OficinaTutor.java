package com.edu.gestor.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "oficina_tutor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OficinaTutor {

	@EmbeddedId
	private OficinaTutorId id;

	@ManyToOne
	@MapsId("idOficina")
	@JoinColumn(name = "id_oficina")
	private Oficina oficina;

	@ManyToOne
	@MapsId("idTutor")
	@JoinColumn(name = "id_tutor")
	private Tutor tutor;
}
