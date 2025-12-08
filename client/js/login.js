// login.js
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');

  loginForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    
    // Validação básica
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    // Validação de formato de e-mail
    if (!isValidEmail(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    
    // Simulação de login bem-sucedido
    alert('Login bem-sucedido!');
    
    // Redirecionar para a página inicial
    window.location.href = 'index.html';
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});