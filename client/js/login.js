document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('loginForm');
  if (Auth.isAuthenticated()) { window.location.href = 'index.html'; return; }

  form.onsubmit = function(e) {
    e.preventDefault();
    var email = document.getElementById('email').value.trim();
    var senha = document.getElementById('senha').value;
    
    if (!email || !senha) { showError('Preencha todos os campos'); return; }
    if (!isValidEmail(email)) { showError('Email inválido'); return; }

    var btn = form.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Entrando...';

    Auth.login(email, senha)
      .then(function() { showSuccess('Login OK!'); window.location.href = 'index.html'; })
      .catch(function(err) { showError(err.message || 'Erro no login'); })
      .finally(function() { btn.disabled = false; btn.textContent = 'Entrar'; });
  };
});