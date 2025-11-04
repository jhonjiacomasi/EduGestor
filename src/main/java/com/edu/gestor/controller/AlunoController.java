package com.edu.gestor.controller;

import com.edu.gestor.model.Aluno;
import com.edu.gestor.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @PostMapping
    public ResponseEntity<Aluno> cadastrarAluno(@RequestBody Aluno aluno) {
        Aluno novoAluno = alunoService.salvarAluno(aluno);
        return new ResponseEntity<>(novoAluno, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<Aluno>> listarAlunos() {
        List<Aluno> alunos = alunoService.listarTodos();
        return ResponseEntity.ok(alunos);
    }
}