package com.edu.gestor.controller;

import com.edu.gestor.model.OficinaTutor;
import com.edu.gestor.model.OficinaTutorId;
import com.edu.gestor.service.OficinaTutorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/oficina-tutores")
public class OficinaTutorController {

    private final OficinaTutorService service;

    public OficinaTutorController(OficinaTutorService service) {
        this.service = service;
    }

    @GetMapping
    public List<OficinaTutor> listar() {
        return service.listarTodos();
    }

    @PostMapping
    public OficinaTutor criar(@RequestBody OficinaTutor oficinaTutor) {
        return service.salvar(oficinaTutor);
    }

    @GetMapping("/oficina/{idOficina}/tutor/{idTutor}")
    public OficinaTutor buscar(@PathVariable Integer idOficina, @PathVariable Integer idTutor) {
        OficinaTutorId id = new OficinaTutorId(idOficina, idTutor);
        return service.buscarPorId(id).orElse(null);
    }

    @DeleteMapping("/oficina/{idOficina}/tutor/{idTutor}")
    public void deletar(@PathVariable Integer idOficina, @PathVariable Integer idTutor) {
        OficinaTutorId id = new OficinaTutorId(idOficina, idTutor);
        service.deletar(id);
    }
}
