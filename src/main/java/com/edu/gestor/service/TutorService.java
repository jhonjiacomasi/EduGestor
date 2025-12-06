package com.edu.gestor.service;

import com.edu.gestor.model.Tutor;
import com.edu.gestor.repository.TutorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TutorService {

    private final TutorRepository repository;

    public TutorService(TutorRepository repository) {
        this.repository = repository;
    }

    public List<Tutor> listarTodos() {
        return repository.findAll();
    }

    public Optional<Tutor> buscarPorId(Integer id) {
        return repository.findById(id);
    }

    public Tutor salvar(Tutor tutor) {
        return repository.save(tutor);
    }

    public void deletar(Integer id) {
        repository.deleteById(id);
    }
}
