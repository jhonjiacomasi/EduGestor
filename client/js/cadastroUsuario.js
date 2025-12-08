// cadastroUsuario.js
document.addEventListener('DOMContentLoaded', () => {
  const cadastroForm = document.getElementById('cadastroForm');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const roleSelect = document.getElementById('role');

  cadastroForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    const role = roleSelect.value;
    
    // Validação básica
    if (!email || !senha || !role) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    // Validação de formato de e-mail
    if (!isValidEmail(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    
    // Validação de senha
    if (senha.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    
    // Criar objeto de usuário
    const usuario = {
      email: email,
      senha: senha,
      role: role
    };
    
    // Salvar no DB principal
    if (salvarUsuario(usuario)) {
      alert('Cadastro realizado com sucesso!');
      
      // Redirecionar para login
      window.location.href = 'login.html';
    }
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function salvarUsuario(usuario) {
    // Obter DB principal
    const db = readDB();
    
    // Verificar se email já existe
    const emailExiste = db.usuarios.some(u => u.email === usuario.email);
    if (emailExiste) {
      alert('Este e-mail já está cadastrado.');
      return false;
    }
    
    // Adicionar novo usuário
    db.usuarios.push(usuario);
    
    // Salvar no DB
    writeDB(db);
    
    return true;
  }
});
