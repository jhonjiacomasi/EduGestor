const form = document.getElementById('formCadastro');
const lista = document.getElementById('listaCadastros');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const tipo = document.getElementById('tipo').value;
  const nome = document.getElementById('nome').value;
  const extra = document.getElementById('extra').value;

  if (!tipo || !nome) {
    alert('Preencha todos os campos obrigatórios!');
    return;
  }

  const item = document.createElement('li');
  item.innerHTML = `<strong>${tipo.toUpperCase()}</strong> - ${nome} (${extra || 'Sem info adicional'})`;
  
  lista.appendChild(item);
  form.reset();
});

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
