package com.edu.gestor.controller;

import com.edu.gestor.model.Professor;
import com.edu.gestor.service.ProfessorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professores")
public class ProfessorController {

    private final ProfessorService service;

    public ProfessorController(ProfessorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Professor> listar() {
        return service.listarTodos();
    }

    @PostMapping
    public Professor criar(@RequestBody Professor professor) {
        return service.salvar(professor);
    }

    @GetMapping("/{id}")
    public Professor buscar(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Professor atualizar(@PathVariable Integer id, @RequestBody Professor professor) {
        professor.setId(id);
        return service.salvar(professor);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
