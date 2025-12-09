package com.edu.gestor.controller;

import com.edu.gestor.model.Oficina;
import com.edu.gestor.service.OficinaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/oficinas")
public class OficinaController {

    private final OficinaService service;

    public OficinaController(OficinaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Oficina> listar() {
        return service.listarTodas();
    }

    @PostMapping
    public Oficina criar(@RequestBody Oficina oficina) {
        return service.salvar(oficina);
    }

    @GetMapping("/{id}")
    public Optional<Oficina> buscar(@PathVariable Integer id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Oficina atualizar(@PathVariable Integer id, @RequestBody Oficina oficina) {
        oficina.setId(id);
        return service.salvar(oficina);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
