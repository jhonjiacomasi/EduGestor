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
    
    // Verificar credenciais
    if (autenticarUsuario(email, senha)) {
      alert('Login bem-sucedido!');
      
      // Redirecionar para a página inicial
      window.location.href = 'index.html';
    } else {
      alert('E-mail ou senha incorretos.');
    }
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function autenticarUsuario(email, senha) {
    // Obter DB principal
    const db = readDB();
    
    // Buscar usuário por email e senha
    const usuario = db.usuarios.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
      // Salvar sessão do usuário
      localStorage.setItem('ellp_usuario_logado', JSON.stringify({
        email: usuario.email,
        role: usuario.role,
      }));
      return true;
    }
    
    return false;
  }
});