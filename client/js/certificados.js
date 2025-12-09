document.addEventListener('DOMContentLoaded', () => {

  if (!Auth.isAuthenticated()) {
    window.location.href = 'login.html';
    return;
  }

  const certOficina = document.getElementById('certOficina');
  const certAluno = document.getElementById('certAluno');
  const btnGerar = document.getElementById('btnGerar');
  const btnGerarTodos = document.getElementById('btnGerarTodos');

  let dataCache = {
    oficinas: [],
    alunos: [],
    professores: [],
  };

  function mapProfessor(p) {
    return {
      id: p.idProfessor,
      nome: p.nomeProfessor,
      email: p.email,
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
      const [oficinasRaw, alunosRaw, professoresRaw] = await Promise.all([
        API.oficinas.listar(),
        API.alunos.listar(),
        API.professores.listar(),
      ]);

      const oficinas = (oficinasRaw || []).map(mapOficina);
      const alunos = (alunosRaw || []).map(mapAluno);
      const professores = (professoresRaw || []).map(mapProfessor);

      dataCache = { oficinas, alunos, professores };
      return dataCache;
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      showError('Erro ao carregar dados: ' + error.message);
      return dataCache;
    }
  }

  async function refreshUI() {
    const data = await loadData();

    certOficina.innerHTML = '<option value="">-- selecione --</option>';
    data.oficinas.forEach((of) => {
      const opt = document.createElement('option');
      opt.value = of.id;
      opt.textContent = `${of.tema}${of.data ? ' — ' + of.data : ''}`;
      certOficina.appendChild(opt);
    });

    certAluno.innerHTML = '<option value="">-- selecione oficina primeiro --</option>';
  }

  certOficina?.addEventListener('change', () => {
    const oficinaId = certOficina.value;
    certAluno.innerHTML = '';

    if (!oficinaId) {
      certAluno.innerHTML = '<option value="">-- selecione oficina primeiro --</option>';
      return;
    }

    const oficina = dataCache.oficinas.find(of => String(of.id) === String(oficinaId));
    if (!oficina) return;

    const alunosIds = oficina.alunosIds || [];
    alunosIds.forEach(alunoId => {
      const aluno = dataCache.alunos.find(a => String(a.id) === String(alunoId));
      if (aluno) {
        const o = document.createElement('option');
        o.value = aluno.id;
        o.textContent = aluno.nome;
        certAluno.appendChild(o);
      }
    });

    if (alunosIds.length === 0) {
      certAluno.innerHTML = '<option value="">-- nenhum aluno nesta oficina --</option>';
    }
  });

  function openCertificateWindow(alunoId, oficinaId) {
    const aluno = dataCache.alunos.find(a => String(a.id) === String(alunoId));
    const oficina = dataCache.oficinas.find(of => String(of.id) === String(oficinaId));
    const professor = oficina?.professorId
      ? dataCache.professores.find(p => String(p.id) === String(oficina.professorId))
      : null;

    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
    ];
    const hoje = new Date();
    const dataFormatada = `${hoje.getDate()} de ${meses[hoje.getMonth()]} de ${hoje.getFullYear()}`;

    const html = `
      <html>
      <head>
        <meta charset="utf-8"/>
        <title>Certificado - ${aluno?.nome || ''}</title>
        <style>
          body{
            font-family: Arial, Helvetica, sans-serif;
            display:flex; align-items:center; justify-content:center;
            height:100vh; margin:0; background:#f0f4ff;
          }
          .cert{
            width:800px; height:560px; padding:40px;
            background:white; border:6px solid #6C63FF;
            box-shadow:0 12px 30px rgba(0,0,0,0.08);
            position:relative;
          }
          h1{color:#333; margin:0 0 20px; font-size:28px;}
          .subtitle{color:#666; margin-bottom:30px;}
          .content{font-size:18px;color:#222;line-height:1.4;}
          .foot{position:absolute; bottom:40px; width:100%; text-align:center; font-size:14px; color:#444;}
          .small{font-size:13px;color:#666;margin-top:20px;}
          .local-data{margin-top:40px; font-size:15px; color:#444;}
        </style>
      </head>
      <body>
        <div class="cert">
          <h1>Certificado de Participação</h1>
          <div class="subtitle">Projeto ELLP — Ensino Lúdico de Lógica e Programação</div>
          <div class="content">
            Certificamos que <strong>${aluno?.nome || '---'}</strong> participou da oficina
            <strong>"${oficina?.tema || '---'}"</strong> ${oficina?.data ? 'em ' + oficina.data : ''}.
            <div class="small">Professor responsável: ${professor?.nome || '—'}</div>
            <div class="local-data">Cornélio Procópio, ${dataFormatada}.</div>
          </div>
          <div class="foot">Assinatura: ELLP — Projeto de Extensão</div>
        </div>
        <script>
          setTimeout(()=>{ window.print(); }, 300);
        </script>
      </body>
      </html>
    `;

    const w = window.open('', '_blank');
    w.document.open();
    w.document.write(html);
    w.document.close();
  }

  btnGerar?.addEventListener('click', () => {
    if (certOficina.value === '' || certAluno.value === '') {
      showError('Selecione oficina e aluno.');
      return;
    }
    
    openCertificateWindow(certAluno.value, certOficina.value);
  });

  btnGerarTodos?.addEventListener('click', () => {
    if (certOficina.value === '') {
      showError('Selecione a oficina.');
      return;
    }

    const oficina = dataCache.oficinas.find(of => String(of.id) === String(certOficina.value));
    const alunosIds = oficina?.alunosIds || [];
    
    if (!oficina || alunosIds.length === 0) {
      showError('Oficina sem alunos.');
      return;
    }

    alunosIds.forEach((alunoId, i) => {
      setTimeout(() => openCertificateWindow(alunoId, certOficina.value), i * 600);
    });
  });

  refreshUI();
});
