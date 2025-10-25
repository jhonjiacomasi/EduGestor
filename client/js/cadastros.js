// cadastros.js
document.addEventListener('DOMContentLoaded', () => {
  // forms
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

  // Controla visibilidade do campo RA
  profTipoSelect?.addEventListener('change', e => {
    if(e.target.value === 'tutor') {
      raField.style.display = 'block';
      tutorRAInput.setAttribute('required', 'required');
    } else {
      raField.style.display = 'none';
      tutorRAInput.removeAttribute('required');
      tutorRAInput.value = '';
    }
  });

  const exportBtn = document.getElementById('exportBtn');
  const importFile = document.getElementById('importFile');

  function refreshUI(){
    const db = readDB();

    // escolas
    listaEscolasEl.innerHTML = '';
    alunoEscolaSelect.innerHTML = '<option value="">-- Sem escola --</option>';
    db.escolas.forEach((e, i) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${e.nome}</strong><br>
        ${e.cidade ? '📍 ' + e.cidade + '<br>' : ''}
        ${e.coordenadorDiretor ? '👤 ' + e.coordenadorDiretor + '<br>' : ''}
        ${e.contato ? '📞 ' + e.contato : ''}
      `;
      listaEscolasEl.appendChild(li);
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = e.nome + (e.cidade ? ` (${e.cidade})` : '');
      alunoEscolaSelect.appendChild(opt);
    });

    // profs/tutores
    listaProfTutEl.innerHTML = '';
    const combined = [
      ...db.professores.map(p => ({...p, tipo: 'Professor'})),
      ...db.tutores.map(t => ({...t, tipo: 'Tutor'}))
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

    // alunos
    listaAlunosEl.innerHTML = '';
    db.alunos.forEach((a) => {
      const escolaNome = (a.escolaIndex !== null && db.escolas[a.escolaIndex]) ? db.escolas[a.escolaIndex].nome : '—';
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

  // handlers
  formEscola?.addEventListener('submit', e=>{
    e.preventDefault();
    const nome = document.getElementById('escolaNome').value.trim();
    const cidade = document.getElementById('escolaCidade').value.trim();
    const contato = document.getElementById('escolaContato').value.trim();
    const coordenadorDiretor = document.getElementById('escolaCoordenadorDiretor').value.trim();
    if(!nome) return alert('Preencha o nome da escola.');
    const db = readDB();
    db.escolas.push({ nome, cidade, contato, coordenadorDiretor });
    writeDB(db);
    formEscola.reset();
    refreshUI();
  });

  formProfTutor?.addEventListener('submit', e=>{
    e.preventDefault();
    const tipo = document.getElementById('profTipo').value;
    const nome = document.getElementById('profNome').value.trim();
    const email = document.getElementById('profEmail').value.trim();
    const ra = document.getElementById('tutorRA').value.trim();
    if(!nome) return alert('Preencha o nome.');
    const db = readDB();
    if(tipo === 'professor') {
      db.professores.push({ nome, email });
    } else {
      db.tutores.push({ nome, email, ra });
    }
    writeDB(db);
    formProfTutor.reset();
    raField.style.display = 'none';
    tutorRAInput.removeAttribute('required');
    refreshUI();
  });  
  
  formAluno?.addEventListener('submit', e=>{
    e.preventDefault();
    const nome = document.getElementById('alunoNome').value.trim();
    const idade = document.getElementById('alunoIdade').value;
    const responsavel = document.getElementById('alunoResponsavel').value.trim();
    const contatoResp = document.getElementById('alunoContatoResp').value.trim();
    const ano = document.getElementById('alunoAno').value.trim();
    const escolaIndex = document.getElementById('alunoEscola').value !== '' ? Number(document.getElementById('alunoEscola').value) : null;
    if(!nome) return alert('Preencha o nome do aluno.');
    const db = readDB();
    db.alunos.push({ nome, idade: idade ? Number(idade) : null, responsavel, contatoResp, ano, escolaIndex });
    writeDB(db);
    formAluno.reset();
    refreshUI();
  });

  exportBtn?.addEventListener('click', e=>{
    exportDB();
  });

  importFile?.addEventListener('change', e=>{
    const file = e.target.files[0];
    if(!file) return;
    if(!confirm('Importar um backup irá substituir os dados atuais. Deseja continuar?')){ e.target.value = ''; return; }
    importDB(file, (ok) => {
      if(ok){
        alert('Importado com sucesso!');
        refreshUI();
      }else{
        alert('Falha ao importar. Verifique o arquivo JSON.');
      }
      e.target.value = '';
    });
  });

  // inicializa UI
  refreshUI();
});
