## 🎓 Sistema de Controle de Oficinas Acadêmicas

### 📘 Descrição
Aplicação web para gerenciamento de oficinas acadêmicas, permitindo o cadastro de professores, tutores, alunos, temas de oficinas e emissão de certificados digitais. O sistema visa facilitar a organização e acompanhamento das atividades extracurriculares em instituições de ensino.

---

### 🛠️ Tecnologias Utilizadas

| Camada       | Tecnologia                     |
|--------------|--------------------------------|
| Backend      | Java 17, Spring Boot, JPA, Hibernate |
| Frontend     | React|
| Banco de Dados | PostgreSQL                   |
| Testes       | JUnit, Mockito, Cypress        |
| Autenticação | JWT         |
| Deploy       | Railway (backend), Vercel (frontend) |

---

### 📌 Requisitos Funcionais

- Cadastro de professores, tutores e alunos
- Criação e gerenciamento de oficinas com temas e datas
- Inscrição de alunos nas oficinas
- Registro de presença
- Emissão de certificados digitais em PDF
- Painel administrativo para controle das oficinas
- Autenticação e autorização por perfil (admin, professor, tutor, aluno)

---

### 🏗️ Arquitetura do Sistema

```
[ React SPA ] ←→ [ Spring Boot REST API ] ←→ [ PostgreSQL ]
```

- **Frontend**: Interface amigável com React, formulários dinâmicos e dashboards
- **Backend**: API RESTful com Spring Boot, validações e lógica de negócio
- **Banco de Dados**: Modelo relacional com entidades como Oficina, Usuário, Certificado

---

### 🧪 Estratégia de Testes

- **Backend**: Testes unitários com JUnit e Mockito
- **Frontend**: Testes end-to-end com Cypress
- **CI/CD**: Pipeline automatizado com GitHub Actions

---

### 📅 Cronograma de Desenvolvimento

| Semana | Atividade                                 |
|--------|--------------------------------------------|
| 1      | Definição de escopo e modelagem de dados   |
| 2      | Implementação do backend                   |
| 3      | Desenvolvimento do frontend                |
| 4      | Integração entre frontend e backend        |
| 5      | Implementação de testes e emissão de certificados |
| 6      | Ajustes finais e apresentação              |

---

### 📄 Como Executar o Projeto

#### Backend
```bash
cd backend
./mvnw spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

### 📎 Licença
Projeto acadêmico sob licença MIT.

---

