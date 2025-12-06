package com.edu.gestor.controller;

import com.edu.gestor.model.Aluno;
import com.edu.gestor.service.AlunoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    private final AlunoService service;

    public AlunoController(AlunoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Aluno> listar() {
        return service.listarTodos();
    }

    @PostMapping
    public Aluno criar(@RequestBody Aluno aluno) {
        return service.salvar(aluno);
    }

    @GetMapping("/{id}")
    public Aluno buscar(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Aluno atualizar(@PathVariable Integer id, @RequestBody Aluno aluno) {
        aluno.setIdAluno(id);
        return service.salvar(aluno);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
