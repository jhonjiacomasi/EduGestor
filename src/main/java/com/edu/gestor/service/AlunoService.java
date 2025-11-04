package com.edu.gestor.service;

import com.edu.gestor.model.Aluno;
import com.edu.gestor.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    public Aluno salvarAluno(Aluno aluno) {
        return alunoRepository.save(aluno);
    }
    
    public List<Aluno> listarTodos() {
        return alunoRepository.findAll();
    }
}