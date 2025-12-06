package com.edu.gestor.service;

import com.edu.gestor.model.Escola;
import com.edu.gestor.repository.EscolaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EscolaService {

    private final EscolaRepository repository;

    public EscolaService(EscolaRepository repository) {
        this.repository = repository;
    }

    public List<Escola> listarTodas() {
        return repository.findAll();
    }

    public Optional<Escola> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public Escola salvar(Escola escola) {
        return repository.save(escola);
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}
