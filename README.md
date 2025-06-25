# QR Menu Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

> Backend para sistema de cardápios digitais com QR Code

## 📋 Documentação

A documentação da API está disponível em:

```bash
https://qrmenu-backend-prod.vercel.app/api/
```

> ⚠️ Nota: A documentação pode ficar temporariamente offline em alguns momentos.

## 🚀 Começando

### Pré-requisitos

- Node.js > v21.5.0
- Docker > v24.0.7
- Docker Compose

### 🔧 Configuração

1. Clone o repositório
2. Configure as variáveis de ambiente:

```bash
cp .env_sample .env
```

3. Instale as dependências:

```bash
npm install
```

### 🏗️ Banco de Dados

Para iniciar o banco de dados:

```bash
docker compose up -d
```

Para executar as migrações:

```bash
npx sequelize-cli db:migrate
```

### 🏃‍♂️ Executando o Projeto

```bash
# Modo desenvolvimento
npm run start

# Modo desenvolvimento com hot-reload (recomendado para desenvolvimento local)
npm run start:dev

# Modo produção
npm run start:prod
```

### 🌐 Verificando a Aplicação

- Aplicação rodando: http://localhost:3005/
- Documentação Swagger: http://localhost:3005/api

## 🧪 Testes

### Testes Unitários

```bash
# Executar testes unitários
npm run test:unit

# Executar testes unitários com watch
npm run test:unit:watch

# Executar testes unitários com cobertura
npm run test:unit:cov

# Executar testes unitários com debug
npm run test:unit:debug

# Executar testes unitários com watch e cobertura
npm run test:unit:watch:cov
```

### Testes E2E

> ⚠️ Importante: Antes de executar os testes E2E, é necessário que o projeto esteja rodando (ex: `npm run start:dev`)

```bash
# Executar testes E2E
npm run test:e2e

# Executar testes E2E com watch
npm run test:e2e:watch

# Executar testes E2E com watch e cobertura
npm run test:e2e:watch:cov
```

## 🛠️ Desenvolvimento

Para gerar um novo módulo NestJS:

```bash
nest g res {moduleName} --no-spec
# Exemplo: nest g res user --no-spec
```
