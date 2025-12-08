// script.js - funções gerais
document.addEventListener('DOMContentLoaded', () => {
  const yearEls = ['year','year2','year3','year4'];
  yearEls.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = new Date().getFullYear();
  });
});

// helpers para LocalStorage
const DB_KEY = 'ellp_db_v1';

function readDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    const init = { escolas: [], professores: [], tutores: [], alunos: [], oficinas: [], usuarios: [] };
    localStorage.setItem(DB_KEY, JSON.stringify(init));
    return init;
  }
  try { return JSON.parse(raw); } catch(e){ return { escolas: [], professores: [], tutores: [], alunos: [], oficinas: [], usuarios: [] }; }
}

function writeDB(db){
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function exportDB(){
  const data = readDB();
  const a = document.createElement('a');
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  a.href = URL.createObjectURL(blob);
  a.download = `ellp-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function importDB(file, onFinish){
  const reader = new FileReader();
  reader.onload = (e) => {
    try{
      const parsed = JSON.parse(e.target.result);
      // simples validação
      if(parsed && typeof parsed === 'object'){
        writeDB(parsed);
        if(onFinish) onFinish(true);
      } else { if(onFinish) onFinish(false); }
    }catch(err){ if(onFinish) onFinish(false); }
  };
  reader.readAsText(file);
}
