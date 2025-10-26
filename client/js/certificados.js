// certificados.js
document.addEventListener('DOMContentLoaded', () => {
  const certOficina = document.getElementById('certOficina');
  const certAluno = document.getElementById('certAluno');
  const btnGerar = document.getElementById('btnGerar');
  const btnGerarTodos = document.getElementById('btnGerarTodos');

  function refreshUI(){
    const db = readDB();
    certOficina.innerHTML = '<option value="">-- selecione --</option>';
    db.oficinas.forEach((of, i) => {
      const opt = document.createElement('option'); opt.value = i; opt.textContent = `${of.tema} ${of.data ? ' — ' + of.data : ''}`; certOficina.appendChild(opt);
    });
    certAluno.innerHTML = '<option value="">-- selecione oficina primeiro --</option>';
  }

  certOficina?.addEventListener('change', e=>{
    const db = readDB();
    const idx = certOficina.value;
    certAluno.innerHTML = '';
    if(idx === '') { certAluno.innerHTML = '<option value="">-- selecione oficina primeiro --</option>'; return; }
    const oficina = db.oficinas[idx];
    if(!oficina) return;
    oficina.alunos.forEach(ai => {
      const o = document.createElement('option'); o.value = ai; o.textContent = db.alunos[ai]?.nome || '—'; certAluno.appendChild(o);
    });
  });

function openCertificateWindow(alunoIndex, oficinaIndex){
  const db = readDB();
  const aluno = db.alunos[alunoIndex];
  const oficina = db.oficinas[oficinaIndex];
  const professor = oficina.professorIndex !== null ? db.professores[oficina.professorIndex] : null;

  // 🔹 Gera a data atual formatada (ex: 23 de outubro de 2025)
  const meses = [
    'janeiro','fevereiro','março','abril','maio','junho',
    'julho','agosto','setembro','outubro','novembro','dezembro'
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


  btnGerar?.addEventListener('click', ()=>{
    if(certOficina.value === '' || certAluno.value === '') return alert('Selecione oficina e aluno.');
    openCertificateWindow(Number(certAluno.value), Number(certOficina.value));
  });

  btnGerarTodos?.addEventListener('click', ()=>{
    if(certOficina.value === '') return alert('Selecione a oficina.');
    const db = readDB();
    const oficinaIndex = Number(certOficina.value);
    const oficina = db.oficinas[oficinaIndex];
    if(!oficina || !oficina.alunos.length) return alert('Oficina sem alunos.');
    // abrir um por vez (abre em novas janelas; pode bloquear popup em alguns navegadores)
    oficina.alunos.forEach((aIndex, i) => {
      setTimeout(()=> openCertificateWindow(aIndex, oficinaIndex), i * 600);
    });
  });

  refreshUI();
});
