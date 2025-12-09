package com.edu.gestor.controller;

import java.util.List;

import org.springframework.http.ResponseEntity; // Importe ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.gestor.model.Inscricao;
import com.edu.gestor.model.InscricaoId;
import com.edu.gestor.service.InscricaoService;

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
    
    // --- NOVOS ENDPOINTS PARA CERTIFICADO DIGITAL ---

    /**
     * Endpoint para professores/tutores confirmarem a presença do aluno.
     * Requer autorização de 'PROFESSOR' ou 'TUTOR'.
     * @throws Exception 
     */
    // @PreAuthorize("hasAnyRole('PROFESSOR', 'TUTOR')") // **ADICIONAR AUTORIZAÇÃO AQUI**
    @PostMapping("/confirmar-presenca/oficina/{idOficina}/aluno/{idAluno}")
    public Inscricao confirmarPresenca(
            @PathVariable Integer idOficina, 
            @PathVariable Integer idAluno) throws Exception {
        
        InscricaoId id = new InscricaoId(idOficina, idAluno);
        return service.confirmarPresenca(id); // Chamará o novo método no Service
    }

    /**
     * Endpoint para professores/tutores emitirem o certificado.
     * Requer autorização de 'PROFESSOR' ou 'TUTOR'.
     * @throws Exception 
     */
    // @PreAuthorize("hasAnyRole('PROFESSOR', 'TUTOR')") // **ADICIONAR AUTORIZAÇÃO AQUI**
    @PostMapping("/emitir-certificado/oficina/{idOficina}/aluno/{idAluno}")
    public ResponseEntity<Inscricao> emitirCertificado(
            @PathVariable Integer idOficina, 
            @PathVariable Integer idAluno) throws Exception {
        
        InscricaoId id = new InscricaoId(idOficina, idAluno);
        
        Inscricao certificadoEmitido = service.emitirCertificado(id); // Chamará o novo método no Service
        return ResponseEntity.ok(certificadoEmitido);
    }
}