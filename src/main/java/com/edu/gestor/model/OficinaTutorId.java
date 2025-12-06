package com.edu.gestor.model;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class OficinaTutorId implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 3743397513689724965L;
	private Integer idOficina;
    private Integer idTutor;
}