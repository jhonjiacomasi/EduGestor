var Auth = (function() {
  var TOKEN_KEY = 'ellp_auth_token';
  var USER_KEY = 'ellp_usuario_logado';
  var PUBLIC_PAGES = ['login.html', 'cadastroUsuario.html'];

  var PERMISSIONS = {
    ADMIN: { canManageUsers: true, canManageEscolas: true, canManageProfessores: true, canManageTutores: true, canManageAlunos: true, canManageOficinas: true, canGenerateCertificados: true, canExportData: true, canImportData: true, canDeleteOficinas: true },
    PROFESSOR: { canManageUsers: false, canManageEscolas: false, canManageProfessores: false, canManageTutores: false, canManageAlunos: true, canManageOficinas: true, canGenerateCertificados: true, canExportData: true, canImportData: false, canDeleteOficinas: true },
    TUTOR: { canManageUsers: false, canManageEscolas: false, canManageProfessores: false, canManageTutores: false, canManageAlunos: false, canManageOficinas: false, canGenerateCertificados: true, canExportData: false, canImportData: false, canDeleteOficinas: false },
    ALUNO: { canManageUsers: false, canManageEscolas: false, canManageProfessores: false, canManageTutores: false, canManageAlunos: false, canManageOficinas: false, canGenerateCertificados: false, canExportData: false, canImportData: false, canDeleteOficinas: false }
  };

  function decodeJWT(token) {
    try {
      var parts = token.split('.');
      if (parts.length !== 3) return null;
      var base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')));
    } catch (e) { return null; }
  }

  function isTokenExpired(token) {
    var payload = decodeJWT(token);
    if (!payload || !payload.exp) return true;
    return payload.exp * 1000 < Date.now();
  }

  function setToken(token) {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      var payload = decodeJWT(token);
      if (payload) setUser({ username: payload.sub, role: payload.role || 'ALUNO' });
    }
  }

  function getToken() {
    var token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    if (isTokenExpired(token)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return null;
    }
    return token;
  }

  function removeToken() { localStorage.removeItem(TOKEN_KEY); }
  function setUser(user) { if (user) localStorage.setItem(USER_KEY, JSON.stringify(user)); }
  function getUser() {
    var raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }
  function removeUser() { localStorage.removeItem(USER_KEY); }

  function isAuthenticated() { return !!(getToken() && getUser()); }
  function getUserRole() { var user = getUser(); return user ? user.role : null; }

  function hasPermission(permission) {
    return true;
  }

  function isPublicPage() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    return PUBLIC_PAGES.indexOf(page) !== -1;
  }

  function logout() {
    removeToken();
    removeUser();
    if (!isPublicPage()) window.location.href = 'login.html';
  }

  function renderUserInfo() {
    var user = getUser();
    var navLinks = document.querySelector('.nav-links');
    if (navLinks && user) {
      var existing = document.getElementById('userNavItem');
      if (existing) existing.remove();
      var roleNames = { ADMIN: 'Admin', PROFESSOR: 'Professor', TUTOR: 'Tutor', ALUNO: 'Aluno' };
      var li = document.createElement('li');
      li.id = 'userNavItem';
      li.className = 'user-nav-item';
      li.innerHTML = '<span class="user-info"><span class="user-email">' + (user.username || 'Usuário') + '</span> <span class="user-role">(' + (roleNames[user.role] || user.role) + ')</span></span> <button id="btnLogout" class="btn-logout">Sair</button>';
      navLinks.appendChild(li);
      document.getElementById('btnLogout').onclick = function() { if (confirm('Sair?')) logout(); };
    }
  }

  function init() {
    if (!isPublicPage()) {
      if (!isAuthenticated()) { window.location.href = 'login.html'; return; }
      renderUserInfo();
    }
  }

  return {
    setToken: setToken, getToken: getToken, removeToken: removeToken,
    setUser: setUser, getUser: getUser, removeUser: removeUser,
    getUserRole: getUserRole, isAuthenticated: isAuthenticated,
    hasPermission: hasPermission, isPublicPage: isPublicPage,
    logout: logout, renderUserInfo: renderUserInfo, init: init,
    decodeJWT: decodeJWT, isTokenExpired: isTokenExpired,
    login: function(username, password) {
      return API.auth.login(username, password).then(function(res) {
        if (res && res.token) { setToken(res.token); return true; }
        throw new Error('Resposta inválida');
      });
    },
    register: function(username, password, role) {
      return API.auth.register(username, password, role).then(function() {
        return { success: true };
      });
    }
  };
})();

var API = (function() {
  var BASE_URL = 'http://localhost:8080';

  function getHeaders() {
    var headers = { 'Content-Type': 'application/json' };
    var token = Auth.getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return headers;
  }

  function request(endpoint, options) {
    options = options || {};
    var url = BASE_URL + endpoint;
    var config = { method: options.method || 'GET', headers: getHeaders() };
    if (options.body) config.body = options.body;

    return fetch(url, config).then(function(response) {
      if (response.status === 401) {
        if (!Auth.isPublicPage()) Auth.logout();
        throw new Error('Credenciais inválidas');
      }
      if (response.status === 403) throw new Error('Sem permissão');
      if (response.status === 204) return null;
      return response.text().then(function(text) {
        var data = text ? JSON.parse(text) : null;
        if (!response.ok) throw new Error(data && data.message ? data.message : 'Erro');
        return data;
      });
    });
  }

  return {
    auth: {
      login: function(username, password) {
        return request('/auth/login', { method: 'POST', body: JSON.stringify({ username: username, password: password }) });
      },
      register: function(username, password, role) {
        return request('/auth/register', { method: 'POST', body: JSON.stringify({ username: username, password: password, role: (role || 'ALUNO').toUpperCase() }) });
      }
    },
    escolas: {
      listar: function() { return request('/escolas'); },
      buscarPorId: function(id) { return request('/escolas/' + id); },
      criar: function(e) { return request('/escolas', { method: 'POST', body: JSON.stringify({ nomeEscola: e.nome, cidade: e.cidade, endereco: e.contato, estado: (e.coordenadorDiretor || 'PR').substring(0,2) }) }); },
      atualizar: function(id, e) { return request('/escolas/' + id, { method: 'PUT', body: JSON.stringify({ nomeEscola: e.nome, cidade: e.cidade, endereco: e.contato, estado: (e.coordenadorDiretor || 'PR').substring(0,2) }) }); },
      excluir: function(id) { return request('/escolas/' + id, { method: 'DELETE' }); }
    },
    professores: {
      listar: function() { return request('/professores'); },
      buscarPorId: function(id) { return request('/professores/' + id); },
      criar: function(p) { return request('/professores', { method: 'POST', body: JSON.stringify({ nomeProfessor: p.nome, email: p.email }) }); },
      atualizar: function(id, p) { return request('/professores/' + id, { method: 'PUT', body: JSON.stringify({ nomeProfessor: p.nome, email: p.email }) }); },
      excluir: function(id) { return request('/professores/' + id, { method: 'DELETE' }); }
    },
    tutores: {
      listar: function() { return request('/tutores'); },
      buscarPorId: function(id) { return request('/tutores/' + id); },
      criar: function(t) { return request('/tutores', { method: 'POST', body: JSON.stringify({ nomeTutor: t.nome, telefone: t.ra || t.telefone }) }); },
      atualizar: function(id, t) { return request('/tutores/' + id, { method: 'PUT', body: JSON.stringify({ nomeTutor: t.nome, telefone: t.ra || t.telefone }) }); },
      excluir: function(id) { return request('/tutores/' + id, { method: 'DELETE' }); }
    },
    alunos: {
      listar: function() { return request('/alunos'); },
      buscarPorId: function(id) { return request('/alunos/' + id); },
      criar: function(a) { var p = { nomeAluno: a.nome }; if (a.escolaId) p.escola = { idEscola: parseInt(a.escolaId) }; return request('/alunos', { method: 'POST', body: JSON.stringify(p) }); },
      atualizar: function(id, a) { var p = { nomeAluno: a.nome }; if (a.escolaId) p.escola = { idEscola: parseInt(a.escolaId) }; return request('/alunos/' + id, { method: 'PUT', body: JSON.stringify(p) }); },
      excluir: function(id) { return request('/alunos/' + id, { method: 'DELETE' }); }
    },
    oficinas: {
      listar: function() { return request('/oficinas'); },
      buscarPorId: function(id) { return request('/oficinas/' + id); },
      criar: function(o) {
        var p = { tema: o.tema, dataOficina: o.data };
        if (o.professorId) p.professorResponsavel = { idProfessor: parseInt(o.professorId) };
        if (o.tutorId) p.tutor = { id: parseInt(o.tutorId) };
        if (o.alunosIds && o.alunosIds.length) p.alunos = o.alunosIds.map(function(id) { return { idAluno: parseInt(id) }; });
        return request('/oficinas', { method: 'POST', body: JSON.stringify(p) });
      },
      atualizar: function(id, o) {
        var p = { tema: o.tema, dataOficina: o.data };
        if (o.professorId) p.professorResponsavel = { idProfessor: parseInt(o.professorId) };
        if (o.tutorId) p.tutor = { id: parseInt(o.tutorId) };
        if (o.alunosIds && o.alunosIds.length) p.alunos = o.alunosIds.map(function(id) { return { idAluno: parseInt(id) }; });
        return request('/oficinas/' + id, { method: 'PUT', body: JSON.stringify(p) });
      },
      excluir: function(id) { return request('/oficinas/' + id, { method: 'DELETE' }); }
    }
  };
})();
