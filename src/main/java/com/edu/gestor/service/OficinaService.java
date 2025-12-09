package com.edu.gestor.service;

import com.edu.gestor.model.Oficina;
import com.edu.gestor.repository.OficinaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OficinaService {

    private final OficinaRepository repository;

    public OficinaService(OficinaRepository repository) {
        this.repository = repository;
    }

    public List<Oficina> listarTodas() {
        return repository.findAll();
    }

    public Optional<Oficina> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public Oficina salvar(Oficina oficina) {
        return repository.save(oficina);
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}
