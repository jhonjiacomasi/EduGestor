document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.isAuthenticated()) {
    window.location.href = 'login.html';
    return;
  }

  const ofForm = document.getElementById('formOficina');
  const ofProfessor = document.getElementById('ofProfessor');
  const ofTutor = document.getElementById('ofTutor');
  const ofAlunos = document.getElementById('ofAlunos');
  const listaOficinas = document.getElementById('listaOficinas');


  let dataCache = {
    professores: [],
    tutores: [],
    alunos: [],
    oficinas: [],
  };

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
    };
  }

  function mapAluno(a) {
    return {
      id: a.idAluno,
      nome: a.nomeAluno,
      escolaId: a.escola?.idEscola || null,
    };
  }

  function mapOficina(of) {
    return {
      id: of.id,
      tema: of.tema,
      data: of.dataOficina,
      professorId: of.professorResponsavel?.idProfessor || null,
      tutorId: of.tutor?.id || null,
      alunosIds: (of.alunos || []).map(a => a.idAluno),
    };
  }

  async function loadData() {
    try {
      const [professoresRaw, tutoresRaw, alunosRaw, oficinasRaw] = await Promise.all([
        API.professores.listar(),
        API.tutores.listar(),
        API.alunos.listar(),
        API.oficinas.listar(),
      ]);

      const professores = (professoresRaw || []).map(mapProfessor);
      const tutores = (tutoresRaw || []).map(mapTutor);
      const alunos = (alunosRaw || []).map(mapAluno);
      const oficinas = (oficinasRaw || []).map(mapOficina);

      dataCache = { professores, tutores, alunos, oficinas };
      return dataCache;
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      showError('Erro ao carregar dados: ' + error.message);
      return dataCache;
    }
  }

  async function refreshUI() {
    const data = await loadData();

    ofProfessor.innerHTML = '<option value="">-- selecione --</option>';
    data.professores.forEach((p) => {
      const o = document.createElement('option');
      o.value = p.id;
      o.textContent = p.nome;
      ofProfessor.appendChild(o);
    });

    if (ofTutor) {
      ofTutor.innerHTML = '<option value="">-- selecione --</option>';
      data.tutores.forEach((t) => {
        const o = document.createElement('option');
        o.value = t.id;
        o.textContent = t.nome;
        ofTutor.appendChild(o);
      });
    }

    ofAlunos.innerHTML = '';
    data.alunos.forEach((a) => {
      const o = document.createElement('option');
      o.value = a.id;
      o.textContent = a.nome;
      ofAlunos.appendChild(o);
    });

    listaOficinas.innerHTML = '';
    data.oficinas.forEach((of) => {
      const professor = data.professores.find(p => p.id === of.professorId);
      const tutor = data.tutores.find(t => t.id === of.tutorId);
      const profName = professor ? professor.nome : '—';
      const tutorName = tutor ? tutor.nome : '—';
      
      const alunosNomes = (of.alunosIds || [])
        .map(id => {
          const aluno = data.alunos.find(a => a.id === id);
          return aluno ? aluno.nome : '—';
        })
        .join(', ') || 'Nenhum';

      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${of.tema}</strong> — ${of.data || 'sem data'} — Prof: ${profName} — Tutor: ${tutorName}
        <div class="small">Alunos: ${alunosNomes}</div>
        <div style="margin-top:8px"><button data-id="${of.id}" class="btn-outline btn-del">Excluir</button></div>
      `;
      listaOficinas.appendChild(li);
    });
  }

  ofForm?.addEventListener('submit', async e => {
    e.preventDefault();

    const tema = document.getElementById('ofTema').value.trim();
    const data = document.getElementById('ofData').value || null;
    const professorId = ofProfessor.value || null;
    const tutorId = ofTutor ? (ofTutor.value || null) : null;
    const alunosIds = Array.from(ofAlunos.selectedOptions).map(opt => opt.value);
    
    if (!tema) {
      showError('Preencha o tema da oficina.');
      return;
    }

    try {
      await API.oficinas.criar({
        tema,
        data,
        professorId,
        tutorId,
        alunosIds,
      });
      showSuccess('Oficina criada com sucesso!');
      ofForm.reset();
      await refreshUI();
    } catch (error) {
      showError('Erro ao criar oficina: ' + error.message);
    }
  });


  document.addEventListener('click', async (e) => {
    if (e.target.matches('.btn-del')) {
      const id = e.target.dataset.id;
      if (!confirm('Excluir essa oficina?')) return;
      
      try {
        await API.oficinas.excluir(id);
        showSuccess('Oficina excluída com sucesso!');
        await refreshUI();
      } catch (error) {
        showError('Erro ao excluir oficina: ' + error.message);
      }
    }
  });

  refreshUI();
});
