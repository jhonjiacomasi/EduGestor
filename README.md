## 🎓 Sistema de Controle de Oficinas Acadêmicas

### 📘 Descrição
Aplicação web para gerenciamento de oficinas acadêmicas do projeto **ELLP (Ensino Lúdico de Lógica e Programação)**, permitindo o cadastro de professores, tutores, alunos, escolas, temas de oficinas e emissão de certificados digitais. O sistema visa facilitar a organização e acompanhamento das atividades extracurriculares em instituições de ensino.

---

### 🛠️ Tecnologias Utilizadas

| Camada         | Tecnologia                          |
|----------------|-------------------------------------|
| Backend        | Java 17, Spring Boot 3.x, JPA/Hibernate |
| Frontend       | HTML5, CSS3, JavaScript (Vanilla)   |
| Banco de Dados | PostgreSQL                          |
| Autenticação   | JWT (JSON Web Tokens)               |
| Build          | Maven                               |

---

### 📌 Funcionalidades

#### Autenticação e Autorização
- Login com JWT
- Registro de novos usuários
- Controle de acesso por roles: **ADMIN**, **PROFESSOR**, **TUTOR**, **ALUNO**

#### Cadastros
- **Escolas**: Nome, cidade, endereço, estado
- **Professores**: Nome, email
- **Tutores**: Nome, telefone
- **Alunos**: Nome, escola vinculada

#### Oficinas
- Criação e gerenciamento de oficinas com tema e data
- Vinculação de professor responsável e tutor
- Inscrição de alunos nas oficinas

#### Certificados
- Emissão de certificados digitais para alunos participantes

---

### 🏗️ Arquitetura do Sistema

```
┌─────────────────┐     HTTP/REST     ┌─────────────────┐     JPA      ┌─────────────┐
│   Frontend      │ ◄───────────────► │   Spring Boot   │ ◄──────────► │  PostgreSQL │
│   (Vanilla JS)  │                   │   REST API      │              │             │
└─────────────────┘                   └─────────────────┘              └─────────────┘
     Port 3000                              Port 8080                     Port 5432
```

- **Frontend**: Interface com React, formulários dinâmicos e dashboards
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

### 🚀 Como Executar o Projeto

#### Pré-requisitos
- Java 17+
- PostgreSQL 12+
- Node.js (opcional, para live-server)

#### 1. Configurar Banco de Dados
```sql
CREATE DATABASE edugestor;
```

#### 2. Executar o Backend
```bash
./mvnw spring-boot:run
```
Backend em `http://localhost:8080`

#### 3. Executar o Frontend
```bash
cd client
npx live-server --port=3000
```
Frontend em `http://localhost:3000`

---

### 🔑 Fluxo de Autenticação

1. Usuário faz login com `username` e `password`
2. Backend valida e retorna JWT token
3. Frontend armazena token no localStorage
4. Token enviado em todas requisições: `Authorization: Bearer <token>`

---

### 📄 Licença
Projeto acadêmico sob licença MIT.

---

