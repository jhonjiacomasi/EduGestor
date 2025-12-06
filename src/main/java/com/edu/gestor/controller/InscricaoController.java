package com.edu.gestor.controller;

import com.edu.gestor.model.Inscricao;
import com.edu.gestor.model.InscricaoId;
import com.edu.gestor.service.InscricaoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inscricoes")
public class InscricaoController {

    private final InscricaoService service;

    public InscricaoController(InscricaoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Inscricao> listar() {
        return service.listarTodas();
    }

    @PostMapping
    public Inscricao criar(@RequestBody Inscricao inscricao) {
        return service.salvar(inscricao);
    }

    @GetMapping("/oficina/{idOficina}/aluno/{idAluno}")
    public Inscricao buscar(@PathVariable Integer idOficina, @PathVariable Integer idAluno) {
        InscricaoId id = new InscricaoId(idOficina, idAluno);
        return service.buscarPorId(id).orElse(null);
    }

    @DeleteMapping("/oficina/{idOficina}/aluno/{idAluno}")
    public void deletar(@PathVariable Integer idOficina, @PathVariable Integer idAluno) {
        InscricaoId id = new InscricaoId(idOficina, idAluno);
        service.deletar(id);
    }
}
