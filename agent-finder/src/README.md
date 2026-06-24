# Agent Finder - Testes Unitários

Este repositório contém os testes unitários para o projeto "Agent Finder", uma aplicação React para gerenciar e encontrar agentes com base em filtros como disponibilidade, habilidades e equipes.

## Configuração do Ambiente de Testes

O projeto utiliza as seguintes ferramentas para testes:

- **Jest**: Framework de testes
- **React Testing Library**: Biblioteca para testar componentes React
- **User Event**: Biblioteca para simular interações do usuário

### Arquivos de Configuração

- `jest.config.js`: Configuração do Jest
- `__tests__/setup.ts`: Configuração global para os testes

## Estrutura dos Testes

Os testes estão organizados seguindo a mesma estrutura do código-fonte:

```
__tests__/
├── components/
│   └── AgentFinder/
│       ├── AgentCard.test.tsx
│       ├── AgentFinder.test.tsx
│       ├── AgentGrid.test.tsx
│       ├── EmptyState.test.tsx
│       ├── ErrorState.test.tsx
│       ├── FilterPanel.test.tsx
│       ├── LoadingState.test.tsx
│       ├── SearchBar.test.tsx
│       ├── SkillTag.test.tsx
│       ├── StatusIndicator.test.tsx
│       └── WorkloadBar.test.tsx
└── utils/
    ├── api.test.ts
    ├── filterUtils.test.ts
    └── searchUtils.test.ts
```

## Executando os Testes

Para executar os testes, use o seguinte comando:

```bash
npm test
```

Para executar os testes com cobertura:

```bash
npm test -- --coverage
```

## Boas Práticas Implementadas

1. **Isolamento de Componentes**: Uso de mocks para isolar componentes em teste
2. **Testes Focados**: Cada teste verifica uma única funcionalidade
3. **Nomenclatura Clara**: Nomes descritivos para os testes
4. **Verificações de Acessibilidade**: Testes para atributos ARIA e roles
5. **Simulação de Interações**: Uso de userEvent para simular interações reais do usuário
6. **Testes de Edge Cases**: Verificação de comportamento em casos extremos

## Cobertura de Testes

Os testes cobrem:

- Renderização de componentes
- Interações do usuário
- Manipulação de estado
- Chamadas de API
- Filtros e pesquisa
- Estados de carregamento, erro e vazio

============

# 🚀 Tutorial de Instalação - Agent Finder

Um guia rápido para instalar e rodar o projeto Agent Finder na sua máquina.

## 📋 Pré-requisitos

Antes de começar, verifique se você tem instalado:

### 1. Node.js (versão 16 ou superior)
```bash
# Verificar se o Node.js está instalado
node --version

# Verificar se o npm está instalado
npm --version