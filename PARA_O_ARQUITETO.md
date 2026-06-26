# Visão do Projeto — Conversa com o Arquiteto

---

## O que foi construído até aqui

Um fluxo agentizado de qualidade rodando localmente no Claude Code.

```
QA abre Claude Code
  └─ /1-analisa-frontend   → lê o código do projeto, valida seletores com Playwright ao vivo
  └─ /2-gera-cenarios      → gera cenários Gherkin em PT-BR com dados reais do sistema
  └─ /3-valida-cenarios    → executa cada cenário no browser antes de gerar qualquer código
  └─ /4-gera-robot         → gera os arquivos de automação prontos para rodar
  └─ QA revisa, commita e abre PR
  └─ GitHub Actions executa Jest + Robot Framework com quality gates
```

**Quem orquestra hoje? O QA.** Ele roda os skills, revisa o output, commita.
O GitHub só executa — não gera nada.

---

## O que são os quality gates (para contextualizar)

São regras que determinam se o código pode avançar na esteira.
Exemplos do que está implementado hoje:

- **Gate 1:** testes unitários Jest precisam passar → senão bloqueia o merge
- **Gate 2:** testes E2E Robot precisam passar → só roda se o Gate 1 passou

O QA define o que bloqueia. A esteira executa sozinha. Ninguém aperta botão.

---

## Os três níveis — onde estou e para onde posso ir

### Nível 1 — O que existe hoje
```
Claude Code local + GitHub Actions

QA roda skills → gera testes → commita → PR → pipeline executa
```
- Funciona, validado, rodando em produção em uma squad do cliente
- Limitação: ainda depende do QA para acionar a geração

---

### Nível 2 — Próximo passo natural (só qualidade, dentro do GitHub)
```
Dev abre PR com uma nova feature
  └─ GitHub Actions detecta o PR
  └─ Um step chama a Claude API:
       "leia o diff desse PR, gere os cenários e os arquivos .robot"
  └─ Claude devolve os arquivos gerados
  └─ Pipeline abre um PR filho com os testes
  └─ QA revisa e aprova o PR filho
  └─ Pipeline roda Jest + Robot
  └─ Quality gate libera ou bloqueia o merge
```

**A geração é automática. A aprovação continua humana.**
Isso é o que separa um fluxo confiável de um que gera falsos positivos.

Infraestrutura necessária: `ANTHROPIC_API_KEY` no GitHub Secrets. Só.

Quando entra o Jira/MCP: se quiser que o agente leia a história para gerar cenários
alinhados com o critério de aceite — não só com o que o código faz.
Sem Jira: Claude infere pelo código.
Com Jira: Claude cruza código + história e detecta "foi implementado mas não cobre o aceite".

---

### Nível 3 — SDLC agentizado completo (além do GitHub)
```
História criada no Jira
  └─ Orquestrador detecta → Claude gera refinamento → time aprova no Slack
  └─ Claude gera specs técnicas → dev implementa
  └─ PR aberto → Claude gera testes automaticamente
  └─ Pipeline roda → quebrou?
       └─ Claude analisa: bug no código ou no teste?
       └─ Sugere correção → dev/QA aprova → roda de novo
  └─ Passou → fim do fluxo
```

**O GitHub Actions não foi feito para isso.**
O GitHub é bom para "quando X acontece, execute Y" — linear, sem estado.
O SDLC completo precisa de: estado entre etapas, loops, aprovação humana no meio,
múltiplas ferramentas. Isso é orquestração, não pipeline.

Onde viveria: serviço dedicado (n8n, serviço próprio) + Claude API + GitHub + Jira
Complexidade: alta. Isso é um produto, não uma automação.

---

## O que conecta tudo

Os skills que construí são o **núcleo de inteligência** dos três níveis.
A diferença é só onde esse núcleo é acionado:

| Nível | Quem aciona o Claude | Onde vive |
|---|---|---|
| 1 — hoje | QA manualmente | Claude Code local |
| 2 — próximo passo | GitHub Actions (no PR) | GitHub + Claude API |
| 3 — SDLC completo | Orquestrador externo | Serviço dedicado |

---

## A pergunta para o arquiteto

> "Faz sentido atacar só a camada de qualidade dentro do fluxo existente (Nível 2),
> ou existe visão na CI&T de construir o orquestrador do SDLC inteiro (Nível 3)?
> São investimentos muito diferentes — o Nível 2 entrego em semanas, o Nível 3 é um produto."
