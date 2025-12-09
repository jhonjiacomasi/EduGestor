-- Script de criação de banco de dados para gestão de oficinas escolares

-- Data: 2025-11-03
-- Banco: PostgreSQL

-- Execute este script para criar as tabelas principais do sistema de oficinas escolares.

-- Tabela de escolas
CREATE TABLE escola (
    id_escola SERIAL PRIMARY KEY,
    nome_escola VARCHAR(100) NOT NULL,
    endereco VARCHAR(150),
    cidade VARCHAR(50),
    estado CHAR(2)
);

-- Tabela de professores
CREATE TABLE professor (
    id_professor SERIAL PRIMARY KEY,
    nome_professor VARCHAR(100) NOT NULL,
    email VARCHAR(100)
);

-- Tabela de tutores
CREATE TABLE tutor (
    id_tutor SERIAL PRIMARY KEY,
    nome_tutor VARCHAR(100) NOT NULL,
    email VARCHAR(100)
);

-- Tabela de alunos
CREATE TABLE aluno (
    id_aluno SERIAL PRIMARY KEY,
    nome_aluno VARCHAR(100) NOT NULL,
    id_escola INTEGER REFERENCES escola(id_escola)
);

-- Tabela de oficinas
CREATE TABLE oficina (
    id_oficina SERIAL PRIMARY KEY,
    tema VARCHAR(100) NOT NULL,
    data DATE,
    certificado BOOLEAN DEFAULT FALSE,
    id_professor INTEGER REFERENCES professor(id_professor)
);

-- Tabela de relacionamento entre oficinas e tutores
CREATE TABLE oficina_tutor (
    id_oficina INTEGER REFERENCES oficina(id_oficina),
    id_tutor INTEGER REFERENCES tutor(id_tutor),
    PRIMARY KEY (id_oficina, id_tutor)
);

-- Tabela de relacionamento entre oficinas e alunos
CREATE TABLE oficina_aluno (
    id_oficina INTEGER REFERENCES oficina(id_oficina),
    id_aluno INTEGER REFERENCES aluno(id_aluno),
    PRIMARY KEY (id_oficina, id_aluno)
);