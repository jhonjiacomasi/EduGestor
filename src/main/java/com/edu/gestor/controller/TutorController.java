package com.edu.gestor.controller;

import com.edu.gestor.model.Tutor;
import com.edu.gestor.service.TutorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutores")
public class TutorController {

    private final TutorService service;

    public TutorController(TutorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Tutor> listar() {
        return service.listarTodos();
    }

    @PostMapping
    public Tutor criar(@RequestBody Tutor tutor) {
        return service.salvar(tutor);
    }

    @GetMapping("/{id}")
    public Tutor buscar(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Tutor atualizar(@PathVariable Integer id, @RequestBody Tutor tutor) {
        tutor.setId(id);
        return service.salvar(tutor);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        service.deletar(id);
    }
}
