package com.edu.gestor.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.edu.gestor.model.Inscricao;
import com.edu.gestor.model.InscricaoId;
import com.edu.gestor.repository.InscricaoRepository;
import com.edu.gestor.utils.HashUtils;

import jakarta.transaction.Transactional;

@Service
public class InscricaoService {

	private final InscricaoRepository repository;
	private final HashUtils hashUtils; // Injeção do utilitário de hash

	// Adicione o HashUtils ao construtor
	public InscricaoService(InscricaoRepository repository, HashUtils hashUtils) {
		this.repository = repository;
		this.hashUtils = hashUtils;
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

	@Transactional
	public Inscricao confirmarPresenca(InscricaoId id) throws Exception {
		Inscricao inscricao = repository.findById(id).orElseThrow(() -> new Exception("Inscrição não encontrada"));

		inscricao.setPresencaConfirmada(true);
		return repository.save(inscricao);
	}

	/**
	 * Emite o certificado gerando um hash único e salvando a data de emissão.
	 */
	@Transactional
	public Inscricao emitirCertificado(InscricaoId id) throws Exception {
		Inscricao inscricao = repository.findById(id)
				.orElseThrow(() -> new Exception("Inscrição não encontrada."));

		if (!inscricao.getPresencaConfirmada()) {
			throw new IllegalStateException("Presença não confirmada. Certificado não pode ser emitido.");
		}
		if (inscricao.getCodigoCertificado() != null) {
			// Já emitido, retornar o existente
			return inscricao; 
		}

		String dataToHash = inscricao.getAluno().getIdAluno().toString() + 
							inscricao.getOficina().getId().toString() + 
							inscricao.getOficina().getTema() +
							LocalDate.now().toString(); // Adiciona data atual para garantir unicidade em reemissões
		
		String codigoHash = hashUtils.generateSha256Hash(dataToHash);
		
		inscricao.setCodigoCertificado(codigoHash);
		inscricao.setDataEmissao(LocalDate.now());

		return repository.save(inscricao);
	}
}