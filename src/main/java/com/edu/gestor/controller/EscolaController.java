package com.edu.gestor.controller;

import com.edu.gestor.model.Escola;
import com.edu.gestor.service.EscolaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/escolas")
public class EscolaController {

    private final EscolaService service;

    public EscolaController(EscolaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Escola> listar() {
        return service.listarTodas();
    }

    @PostMapping
    public Escola criar(@RequestBody Escola escola) {
        return service.salvar(escola);
    }

    @GetMapping("/{id}")
    public Escola buscar(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Escola atualizar(@PathVariable Integer id, @RequestBody Escola escola) {
        escola.setIdEscola(id);
        return service.salvar(escola);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
