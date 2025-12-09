document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('cadastroForm');
  if (Auth.isAuthenticated()) { window.location.href = 'index.html'; return; }

  form.onsubmit = function(e) {
    e.preventDefault();
    var email = document.getElementById('email').value.trim();
    var senha = document.getElementById('senha').value;
    var role = document.getElementById('role').value;
    
    if (!email || !senha || !role) { showError('Preencha todos os campos'); return; }
    if (!isValidEmail(email)) { showError('Email inválido'); return; }
    if (senha.length < 6) { showError('Senha deve ter 6+ caracteres'); return; }

    var btn = form.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Cadastrando...';

    Auth.register(email, senha, role)
      .then(function() { showSuccess('Cadastro OK!'); window.location.href = 'login.html'; })
      .catch(function(err) { showError(err.message || 'Erro no cadastro'); })
      .finally(function() { btn.disabled = false; btn.textContent = 'Cadastrar'; });
  };
});
