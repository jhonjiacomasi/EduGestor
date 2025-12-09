document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.isAuthenticated()) {
    window.location.href = 'login.html';
    return;
  }

  const formEscola = document.getElementById('formEscola');
  const formProfTutor = document.getElementById('formProfTutor');
  const formAluno = document.getElementById('formAluno');

  const listaEscolasEl = document.getElementById('listaEscolas');
  const listaProfTutEl = document.getElementById('listaProfTut');
  const listaAlunosEl = document.getElementById('listaAlunos');
  const alunoEscolaSelect = document.getElementById('alunoEscola');

  const profTipoSelect = document.getElementById('profTipo');
  const raField = document.getElementById('raField');
  const tutorRAInput = document.getElementById('tutorRA');

  const exportBtn = document.getElementById('exportBtn');
  const importFile = document.getElementById('importFile');

  let dataCache = {
    escolas: [],
    professores: [],
    tutores: [],
    alunos: [],
  };

  profTipoSelect?.addEventListener('change', e => {
    if (e.target.value === 'tutor') {
      raField.style.display = 'block';
      tutorRAInput.setAttribute('required', 'required');
    } else {
      raField.style.display = 'none';
      tutorRAInput.removeAttribute('required');
      tutorRAInput.value = '';
    }
  });

  function mapEscola(e) {
    return {
      id: e.idEscola,
      nome: e.nomeEscola,
      cidade: e.cidade,
      contato: e.endereco,
      coordenadorDiretor: e.estado,
    };
  }

  function mapProfessor(p) {
    return {
      id: p.idProfessor,
      nome: p.nomeProfessor,
      email: p.email,
    };
  }

  function mapTutor(t) {
    return {
      id: t.id,
      nome: t.nomeTutor,
      ra: t.telefone,
      email: '',
    };
  }

  function mapAluno(a) {
    return {
      id: a.idAluno,
      nome: a.nomeAluno,
      escolaId: a.escola?.idEscola || null,
      idade: null,
      ano: null,
      responsavel: null,
      contatoResp: null,
    };
  }

  async function loadData() {
    try {
      const [escolasRaw, professoresRaw, tutoresRaw, alunosRaw] = await Promise.all([
        API.escolas.listar(),
        API.professores.listar(),
        API.tutores.listar(),
        API.alunos.listar(),
      ]);

      const escolas = (escolasRaw || []).map(mapEscola);
      const professores = (professoresRaw || []).map(mapProfessor);
      const tutores = (tutoresRaw || []).map(mapTutor);
      const alunos = (alunosRaw || []).map(mapAluno);

      dataCache = { escolas, professores, tutores, alunos };
      return dataCache;
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      showError('Erro ao carregar dados: ' + error.message);
      return dataCache;
    }
  }

  async function refreshUI() {
    const data = await loadData();

    listaEscolasEl.innerHTML = '';
    alunoEscolaSelect.innerHTML = '<option value="">-- Sem escola --</option>';
    
    data.escolas.forEach((e) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${e.nome}</strong><br>
        ${e.cidade ? '📍 ' + e.cidade + '<br>' : ''}
        ${e.coordenadorDiretor ? '👤 ' + e.coordenadorDiretor + '<br>' : ''}
        ${e.contato ? '📞 ' + e.contato : ''}
      `;
      listaEscolasEl.appendChild(li);
      
      const opt = document.createElement('option');
      opt.value = e.id;
      opt.textContent = e.nome + (e.cidade ? ` (${e.cidade})` : '');
      alunoEscolaSelect.appendChild(opt);
    });

    listaProfTutEl.innerHTML = '';
    const combined = [
      ...data.professores.map(p => ({ ...p, tipo: 'Professor' })),
      ...data.tutores.map(t => ({ ...t, tipo: 'Tutor' })),
    ];
    
    combined.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="label">${item.tipo}</span><br>
        <strong>${item.nome}</strong><br>
        ${item.email ? '✉️ ' + item.email + '<br>' : ''}
        ${item.ra ? '🎓 RA: ' + item.ra : ''}
      `;
      listaProfTutEl.appendChild(li);
    });

    listaAlunosEl.innerHTML = '';
    data.alunos.forEach((a) => {
      const escola = data.escolas.find(e => e.id === a.escolaId);
      const escolaNome = escola ? escola.nome : '—';
      
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${a.nome}</strong> ${a.idade ? '(' + a.idade + ' anos)' : ''}<br>
        ${a.ano ? '📚 Ano: ' + a.ano + '<br>' : ''}
        🏫 ${escolaNome}<br>
        ${a.responsavel ? '👨‍👩‍👧 ' + a.responsavel + '<br>' : ''}
        ${a.contatoResp ? '📞 ' + a.contatoResp : ''}
      `;
      listaAlunosEl.appendChild(li);
    });
  }

  formEscola?.addEventListener('submit', async e => {
    e.preventDefault();

    const nome = document.getElementById('escolaNome').value.trim();
    const cidade = document.getElementById('escolaCidade').value.trim();
    const contato = document.getElementById('escolaContato').value.trim();
    const coordenadorDiretor = document.getElementById('escolaCoordenadorDiretor').value.trim();
    
    if (!nome) {
      showError('Preencha o nome da escola.');
      return;
    }

    try {
      await API.escolas.criar({ nome, cidade, contato, coordenadorDiretor });
      showSuccess('Escola cadastrada com sucesso!');
      formEscola.reset();
      await refreshUI();
    } catch (error) {
      showError('Erro ao cadastrar escola: ' + error.message);
    }
  });

  formProfTutor?.addEventListener('submit', async e => {
    e.preventDefault();
    
    const tipo = document.getElementById('profTipo').value;
    const nome = document.getElementById('profNome').value.trim();
    const email = document.getElementById('profEmail').value.trim();
    const ra = document.getElementById('tutorRA').value.trim();
    
    if (!nome) {
      showError('Preencha o nome.');
      return;
    }

    try {
      if (tipo === 'professor') {
        await API.professores.criar({ nome, email });
      } else {
        await API.tutores.criar({ nome, email, ra });
      }
      
      showSuccess(`${tipo === 'professor' ? 'Professor' : 'Tutor'} cadastrado com sucesso!`);
      formProfTutor.reset();
      raField.style.display = 'none';
      tutorRAInput.removeAttribute('required');
      await refreshUI();
    } catch (error) {
      showError('Erro ao cadastrar: ' + error.message);
    }
  });

  formAluno?.addEventListener('submit', async e => {
    e.preventDefault();

    const nome = document.getElementById('alunoNome').value.trim();
    const idade = document.getElementById('alunoIdade').value;
    const responsavel = document.getElementById('alunoResponsavel').value.trim();
    const contatoResp = document.getElementById('alunoContatoResp').value.trim();
    const ano = document.getElementById('alunoAno').value.trim();
    const escolaId = document.getElementById('alunoEscola').value || null;
    
    if (!nome) {
      showError('Preencha o nome do aluno.');
      return;
    }

    try {
      await API.alunos.criar({
        nome,
        idade: idade ? Number(idade) : null,
        responsavel,
        contatoResp,
        ano,
        escolaId,
      });
      showSuccess('Aluno cadastrado com sucesso!');
      formAluno.reset();
      await refreshUI();
    } catch (error) {
      showError('Erro ao cadastrar aluno: ' + error.message);
    }
  });


  exportBtn?.addEventListener('click', async () => {
    await exportData();
  });


  importFile?.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!confirm('Importar um backup irá substituir os dados atuais. Deseja continuar?')) {
      e.target.value = '';
      return;
    }
    
    await importData(file, async (ok) => {
      if (ok) {
        showSuccess('Importado com sucesso!');
        await refreshUI();
      } else {
        showError('Falha ao importar. Verifique o arquivo JSON.');
      }
      e.target.value = '';
    });
  });


  refreshUI();
});
