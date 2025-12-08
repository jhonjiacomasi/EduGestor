package com.edu.gestor.controller;

import org.springframework.http.ResponseEntity;
//Importe a classe de segurança
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.gestor.model.Escola;
import com.edu.gestor.service.EscolaService;
//...

@RestController
@RequestMapping("/escolas")
public class EscolaController {
	// ...

	private final EscolaService service;

	public EscolaController(EscolaService service) {
		super();
		this.service = service;
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public Escola criar(@RequestBody Escola escola) {
		return service.salvar(escola);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public Escola atualizar(@PathVariable Integer id, @RequestBody Escola escola) {
		escola.setIdEscola(id);
		return service.salvar(escola);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public void deletar(@PathVariable Integer id) {
		service.deletar(id);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Escola> buscar(@PathVariable Integer id) {
		return service.buscarPorId(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
}