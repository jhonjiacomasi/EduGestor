package com.edu.gestor.service;

import com.edu.gestor.model.OficinaTutor;
import com.edu.gestor.model.OficinaTutorId;
import com.edu.gestor.repository.OficinaTutorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OficinaTutorService {

    private final OficinaTutorRepository repository;

    public OficinaTutorService(OficinaTutorRepository repository) {
        this.repository = repository;
    }

    public List<OficinaTutor> listarTodos() {
        return repository.findAll();
    }

    public Optional<OficinaTutor> buscarPorId(OficinaTutorId id) {
        return repository.findById(id);
    }

    public OficinaTutor salvar(OficinaTutor oficinaTutor) {
        return repository.save(oficinaTutor);
    }

    public void deletar(OficinaTutorId id) {
        repository.deleteById(id);
    }
}
