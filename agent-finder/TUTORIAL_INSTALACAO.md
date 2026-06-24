# 🚀 Tutorial de Instalação - Agent Finder

Um guia rápido e simples para instalar e rodar o projeto Agent Finder na sua máquina.

## 📋 Pré-requisitos

Antes de começar, verifique se você tem instalado:

### 1. Node.js (versão 16 ou superior)

**Verificar se já está instalado:**
```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version
```

**Se não estiver instalado:**
- Acesse [nodejs.org](https://nodejs.org/)
- Baixe e instale a versão LTS (recomendada)
- O npm vem junto com o Node.js

## 📥 Instalação do Projeto

### Instalar dependências
```bash
# Instalar todas as dependências do projeto
npm install
```

**O que será instalado:**
- React 18
- TypeScript
- React Scripts
- Jest (para testes)
- React Testing Library
- E outras dependências necessárias

## 🏃‍♂️ Executando o Projeto

### Iniciar o servidor de desenvolvimento
```bash
npm start
```

**O que acontece:**
- O projeto será compilado
- Um servidor local será iniciado
- Seu navegador abrirá automaticamente em `http://localhost:3000`
- O projeto recarrega automaticamente quando você faz alterações

### Outros comandos úteis

**Executar testes:**
```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch (reexecuta quando há mudanças)
npm run test:watch
```

**Gerar build de produção:**
```bash
npm run build
```

## 🔧 Verificação da Instalação

### 1. Verificar se o projeto está rodando
- Acesse `http://localhost:3000` no seu navegador
- Você deve ver a interface do Agent Finder

### 2. Verificar se os testes funcionam
```bash
npm test
```
- Os testes devem executar sem erros

### 3. Estrutura do projeto
Após a instalação, você deve ter esta estrutura:
```
react-typescript-crud/
├── public/
├── src/
│   ├── components/
│   ├── types/
│   ├── utils/
│   ├── styles/
│   └── __tests__/
├── package.json
├── tsconfig.json
└── jest.config.js
```

## 🐛 Problemas Comuns

### Erro: "npm não é reconhecido"
**Solução:** Reinstale o Node.js e reinicie o terminal

### Erro: "Port 3000 is already in use"
**Solução:** 
```bash
# Matar processo na porta 3000 (Windows)
npx kill-port 3000

# Ou usar outra porta
PORT=3001 npm start
```

### Erro de dependências
**Solução:**
```bash
# Limpar cache do npm
npm cache clean --force

# Deletar node_modules e reinstalar
rm -rf node_modules
npm install
```

### Erro de TypeScript
**Solução:** Verifique se o TypeScript está instalado corretamente:
```bash
npx tsc --version
```

## 📱 Funcionalidades do Agent Finder

Após a instalação, você poderá:

- ✅ Visualizar lista de agentes
- 🔍 Pesquisar agentes por nome
- 🏷️ Filtrar por habilidades
- 👥 Filtrar por equipes
- 📊 Visualizar disponibilidade
- 🌙 Alternar entre modo claro/escuro

## 🆘 Precisa de Ajuda?

Se encontrar problemas:

1. **Verifique os pré-requisitos** - Node.js versão 16+
2. **Limpe e reinstale** - `rm -rf node_modules && npm install`
3. **Verifique o console** - Procure por mensagens de erro
4. **Reinicie o servidor** - Pare com `Ctrl+C` e rode `npm start` novamente

## 🎉 Pronto!

Agora você tem o Agent Finder rodando na sua máquina! 

**Próximos passos:**
- Explore o código em `src/`
- Execute os testes com `npm test`
- Faça suas modificações e veja as mudanças em tempo real
- Consulte a documentação em `src/README.md` para mais detalhes sobre os testes

---

**Tempo estimado de instalação:** 5-10 minutos  
**Dificuldade:** Iniciante  
**Suporte:** React 18 + TypeScript + Jest