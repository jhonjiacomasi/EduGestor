document.addEventListener('DOMContentLoaded', function() {
  ['year', 'year2', 'year3', 'year4'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  });
  if (typeof Auth !== 'undefined' && !Auth.isPublicPage()) {
    Auth.init();
  }
});

function showError(msg) { alert('❌ ' + msg); }
function showSuccess(msg) { alert('✅ ' + msg); }
function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

async function exportData() {
  try {
    var data = {
      escolas: await API.escolas.listar(),
      professores: await API.professores.listar(),
      tutores: await API.tutores.listar(),
      alunos: await API.alunos.listar(),
      oficinas: await API.oficinas.listar()
    };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'ellp_backup_' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
  } catch (e) {
    showError('Erro ao exportar: ' + e.message);
  }
}

async function importData(file, callback) {
  try {
    var text = await file.text();
    var data = JSON.parse(text);
    console.log('Dados para importar:', data);
    callback(true);
  } catch (e) {
    console.error('Erro ao importar:', e);
    callback(false);
  }
}
