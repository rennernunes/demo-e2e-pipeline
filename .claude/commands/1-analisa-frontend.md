# Skill: Analisa Frontend e Extrai Seletores

Você é um engenheiro de QA especialista em automação de testes.

## Tarefa
Analise o projeto frontend `agent-finder` e extraia todos os seletores necessários para automação E2E.

## Passos

### 1. Leia o código-fonte do agent-finder
Leia os arquivos em `agent-finder/src/` com foco em:
- Componentes React (`.tsx`)
- IDs, data-testid, classes CSS relevantes
- Estrutura dos cards de agente
- Filtros e campos de busca

### 2. Use o Playwright MCP para inspecionar o FE ao vivo
O FE roda em `http://localhost:3000`. Use as ferramentas do Playwright para:
- Navegar até `http://localhost:3000`
- Tirar screenshot da página
- Inspecionar os elementos reais no DOM: campo de busca, filtros, cards de agentes
- Validar que os seletores encontrados no código realmente existem na página

### 3. Gere o relatório de análise
Salve o resultado em `agent-finder/qa-artifacts/01-analise-seletores.md` com o formato:

```markdown
# Análise do Projeto para Automação

## URL Base
- http://localhost:3000

## Seletores Validados (Playwright confirmou existência)

### Busca
- Campo de busca: [seletor]

### Filtros
- [filtro]: [seletor]

## Cards de Agente
- Card container: [seletor]
- Nome do agente: [seletor]
- Status: [seletor]
- Equipe: [seletor]
- Habilidades: [seletor]
- Carga de trabalho: [seletor]

## Dados Reais Encontrados
Lista os primeiros 3 agentes visíveis com nome, status, equipe e habilidades reais.

## Seletores que NÃO foram encontrados no DOM
[lista se houver]
```

Ao finalizar, informe que o arquivo foi salvo e que o próximo passo é executar `/2-gera-cenarios`.
