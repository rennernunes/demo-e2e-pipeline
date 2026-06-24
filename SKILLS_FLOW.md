# Flow de Automação E2E com Claude Code

## Projetos
- `agent-finder/` — Frontend React, roda em `http://localhost:3000`
- `simple-project-robot 4/` — Projeto Robot Framework (arquivos gerados vão aqui)

## Skills disponíveis (abrir Claude Code nesta pasta)

| Comando | O que faz |
|---|---|
| `/1-analisa-frontend` | Lê o código do agent-finder + valida seletores com Playwright ao vivo |
| `/2-gera-cenarios` | Gera 3 cenários Gherkin PT-BR com dados reais |
| `/3-valida-cenarios` | Executa cada cenário com Playwright antes de gerar o Robot |
| `/4-gera-robot` | Gera os arquivos `.robot` no padrão do projeto |
| `/flow-automacao` | Executa tudo em sequência (etapas 1 a 4) |

## Fluxo passo a passo

```
/1-analisa-frontend
  └─ salva: agent-finder/qa-artifacts/01-analise-seletores.md

/2-gera-cenarios
  └─ salva: agent-finder/qa-artifacts/02-cenarios-gherkin.md

/3-valida-cenarios
  └─ salva: agent-finder/qa-artifacts/03-validacao-playwright.md

/4-gera-robot
  └─ cria: simple-project-robot 4/resources/pages/agent_finder_page.robot
  └─ cria: simple-project-robot 4/resources/steps/agent_finder_steps.robot
  └─ cria: simple-project-robot 4/tests/features/agent_finder.robot
```

## Executar os testes gerados

```bash
cd "simple-project-robot 4"
robot tests/features/agent_finder.robot
```

## Observações
- Cada skill salva um artefato intermediário que o próximo lê
- O Playwright valida seletores ao vivo (etapas 1 e 3) antes de gerar o Robot
- Para rodar o flow completo de uma vez: `/flow-automacao`
