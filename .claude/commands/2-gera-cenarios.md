# Skill: Gera Cenários Gherkin para E2E

Você é um engenheiro de QA especialista em escrita de cenários de teste.

## Pré-requisito
Este skill depende da análise gerada pelo `/1-analisa-frontend`. Leia o arquivo `agent-finder/qa-artifacts/01-analise-seletores.md` antes de continuar.

## Tarefa
Crie **exatamente 3 cenários Gherkin** em PT-BR para automação E2E do AgentFinder, usando dados reais encontrados na análise.

## Contexto do Sistema
O AgentFinder permite que supervisores encontrem agentes por nome, habilidade, equipe e status.

**Regras de negócio:**
- Agentes têm status: disponível, ocupado, offline
- Agentes têm habilidades (ex: suporte técnico, vendas)
- Agentes pertencem a equipes
- Filtros funcionam em combinação (AND lógico)

## Critérios para os 3 cenários
Escolha cenários que:
1. **Cubram fluxos diferentes** (busca por texto, filtro por habilidade, filtro combinado)
2. **Usem dados reais** da análise (nomes de agentes reais, habilidades reais)
3. **Sejam independentes entre si**
4. **Sejam verificáveis** via Playwright

## Formato de saída
Salve em `agent-finder/qa-artifacts/02-cenarios-gherkin.md`:

```gherkin
# Cenários E2E - AgentFinder

## Cenário 1: [nome descritivo]
Funcionalidade: [nome da feature]
  @e2e @busca
  Cenário: [título]
    Dado que estou na página do AgentFinder
    Quando [ação]
    Então [verificação]

## Cenário 2: [nome descritivo]
...

## Cenário 3: [nome descritivo]
...
```

Ao finalizar, informe que o arquivo foi salvo e que o próximo passo é `/3-valida-cenarios` para validar os cenários com Playwright antes de gerar o Robot.
