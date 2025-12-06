package com.edu.gestor.service;

import com.edu.gestor.model.Inscricao;
import com.edu.gestor.model.InscricaoId;
import com.edu.gestor.repository.InscricaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InscricaoService {

    private final InscricaoRepository repository;

    public InscricaoService(InscricaoRepository repository) {
        this.repository = repository;
    }

    public List<Inscricao> listarTodas() {
        return repository.findAll();
    }

    public Optional<Inscricao> buscarPorId(InscricaoId id) {
        return repository.findById(id);
    }

    public Inscricao salvar(Inscricao inscricao) {
        return repository.save(inscricao);
    }

    public void deletar(InscricaoId id) {
        repository.deleteById(id);
    }
}
