// oficinas.js
document.addEventListener('DOMContentLoaded', () => {
  const ofForm = document.getElementById('formOficina');
  const ofProfessor = document.getElementById('ofProfessor');
  const ofTutor = document.getElementById('ofTutor');
  const ofAlunos = document.getElementById('ofAlunos');
  const listaOficinas = document.getElementById('listaOficinas');

  function refreshUI(){
    const db = readDB();
    // preenche selects
    ofProfessor.innerHTML = '<option value="">-- selecione --</option>';
    db.professores.forEach((p, i) => {
      const o = document.createElement('option'); o.value = i; o.textContent = p.nome; ofProfessor.appendChild(o);
    });
    ofTutor.innerHTML = '<option value="">-- selecione --</option>';
    db.tutores.forEach((t, i) => {
      const o = document.createElement('option'); o.value = i; o.textContent = t.nome; ofTutor.appendChild(o);
    });
    ofAlunos.innerHTML = '';
    db.alunos.forEach((a, i) => {
      const o = document.createElement('option'); o.value = i; o.textContent = a.nome; ofAlunos.appendChild(o);
    });

    // lista oficinas
    listaOficinas.innerHTML = '';
    db.oficinas.forEach((of, idx) => {
      const profName = (of.professorIndex !== null && db.professores[of.professorIndex]) ? db.professores[of.professorIndex].nome : '—';
      const tutorName = (of.tutorIndex !== null && db.tutores[of.tutorIndex]) ? db.tutores[of.tutorIndex].nome : '—';
      const li = document.createElement('li');
      li.innerHTML = `<strong>${of.tema}</strong> — ${of.data || 'sem data'} — Prof: ${profName} — Tutor: ${tutorName}
        <div class="small">Alunos: ${of.alunos.map(i => db.alunos[i]?.nome || '—').join(', ') || 'Nenhum'}</div>
        <div style="margin-top:8px"><button data-idx="${idx}" class="btn-outline btn-del">Excluir</button></div>`;
      listaOficinas.appendChild(li);
    });
  }

  ofForm?.addEventListener('submit', e=>{
    e.preventDefault();
    const tema = document.getElementById('ofTema').value.trim();
    const data = document.getElementById('ofData').value || null;
    const professorIndex = ofProfessor.value !== '' ? Number(ofProfessor.value) : null;
    const tutorIndex = ofTutor.value !== '' ? Number(ofTutor.value) : null;
    const selected = Array.from(ofAlunos.selectedOptions).map(opt => Number(opt.value));
    if(!tema) return alert('Preencha o tema da oficina.');

    const db = readDB();
    db.oficinas.push({ tema, data, professorIndex, tutorIndex, alunos: selected });
    writeDB(db);
    ofForm.reset();
    refreshUI();
  });

  // excluir oficina
  document.addEventListener('click', (e)=>{
    if(e.target.matches('.btn-del')){
      const idx = Number(e.target.dataset.idx);
      if(!confirm('Excluir essa oficina?')) return;
      const db = readDB();
      db.oficinas.splice(idx,1);
      writeDB(db);
      refreshUI();
    }
  });

  refreshUI();
});
