package com.edu.gestor.model;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class InscricaoId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1786744508702171007L;
	private Integer idOficina;
	private Integer idAluno;
}
