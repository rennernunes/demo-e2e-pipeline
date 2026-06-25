# Roteiro da Demo — Pipeline QA com Claude Code

---

## Contexto para a apresentação (Renata / ArcelorMittal)

**Fio condutor:** "Você quer sair de apertar um botão à noite para testes rodando sozinhos
no pipeline. Essa demo mostra o caminho — e como IA reduz o atrito de chegar lá."

### Os 4 pontos dela e como conectar

**1. Automação na esteira**
Mostre o pipeline ao vivo. A frase que funciona:
> "O QA define o quality gate — o que bloqueia o merge e o que não bloqueia.
> A esteira executa sozinha. Ninguém precisa apertar botão."

Se ela perguntar como montar a pipe:
> "A estratégia é simples: unitários e E2E a cada PR, e ao subir para staging roda tudo de novo.
> Dois momentos de validação — antes de entrar no código e antes de ir para o ambiente.
> A configuração em si é trabalho conjunto com o time de DevOps de vocês."

**2. Legado vs produto novo**
Valide o medo dela antes de propor:
> "Faz todo sentido não exigir cobertura alta em código antigo — você para a empresa.
> A abordagem: legado bloqueia só em falha crítica de segurança.
> Produto novo já nasce com o padrão — unitário obrigatório, E2E nos fluxos críticos."

**3. Pirâmide de testes**

| Camada | O que testa | Velocidade | Manutenção |
|---|---|---|---|
| Unitário | lógica isolada | segundos | baixa |
| Integração | componentes juntos | minutos | média |
| E2E (essa demo) | fluxo do usuário | minutos | alta |

> "Comece pelo topo — E2E nos fluxos que, se quebrarem, ninguém percebe até produção.
> Depois desce a pirâmide conforme o time amadurece."

**4. ROI e cultura**
- Caso do Bill: dois testes encontraram falha crítica em projeto que ia para produção sem validação
- Dado de mercado: bug em produção custa 5x a 100x mais que bug pego em desenvolvimento (IBM)
- Ângulo pessoal para ela: "O analista que aperta botão à noite não consegue crescer.
  Automação libera o QA para pensar em qualidade, não em execução."

---

## Pré-requisitos da demo

- `agent-finder` rodando em `http://localhost:3000` (`npm start` na pasta agent-finder)
- Claude Code aberto na pasta `demo automacao`
- Repositório: https://github.com/rennernunes/demo-e2e-pipeline

---

## Parte 1 — Geração dos testes com Claude Code (skills)

Execute os skills em sequência no Claude Code:

```
/1-analisa-frontend    → lê o código + valida seletores com Playwright ao vivo
/2-gera-cenarios       → gera 3 cenários Gherkin com dados reais
/3-valida-cenarios     → executa cada cenário com Playwright antes de gerar o Robot
/4-gera-robot          → gera os arquivos .robot prontos para rodar
```

Arquivos gerados:
- `simple-project-robot 4/resources/pages/agent_finder_page.robot`
- `simple-project-robot 4/resources/steps/agent_finder_steps.robot`
- `simple-project-robot 4/tests/features/agent_finder.robot`

---

## Parte 2 — PR 1: pipeline verde (tudo passa)

```bash
git checkout -b feat/add-e2e-tests

git add "simple-project-robot 4/resources/pages/agent_finder_page.robot"
git add "simple-project-robot 4/resources/steps/agent_finder_steps.robot"
git add "simple-project-robot 4/tests/features/agent_finder.robot"

git commit -m "feat: adiciona testes E2E gerados pelo Claude Code"
git push origin feat/add-e2e-tests

gh pr create --title "feat: adiciona testes E2E" --body "Gerados via Claude Code"
```

Abra o Actions e mostre ao vivo:
1. Job "Testes Unitários (Jest)" → verde
2. Job "Testes E2E (Robot Framework)" → verde
3. PR liberado para merge → faça o merge

---

## Parte 3 — PR 2: E2E quebrado (mostra o bloqueio)

O que fazer: corrigir algo no `agent-finder` (passa no unit) MAS quebrar um seletor no E2E no mesmo commit — simula um desenvolvedor que esqueceu de atualizar o teste.

```bash
git checkout main && git pull
git checkout -b fix/update-search
```

**Alteração 1 — muda algo no agent-finder (unit test passa):**

Edite `agent-finder/src/utils/api.ts`, linha do agente Alex Johnson:
```ts
// antes:
name: 'Alex Johnson',
// depois:
name: 'Alex J. Johnson',
```

**Alteração 2 — no mesmo commit, quebra o seletor E2E:**

Edite `simple-project-robot 4/tests/features/agent_finder.robot`:
```
# antes:
Quando digito "Alex Johnson" no campo de busca
Então devo ver 1 agente encontrado
E o card do agente "Alex Johnson" deve estar visível

# depois (nome desatualizado — não vai encontrar):
Quando digito "Alex Johnson" no campo de busca
Então devo ver 1 agente encontrado
E o card do agente "Alex Johnson" deve estar visível
E o status do agente "Alex Johnson" deve ser "Available"
```

> Ou mais simples: apenas mude o nome no teste para um que não existe:
> `Quando digito "Alex Johnson Silva" no campo de busca`

```bash
git add agent-finder/src/utils/api.ts
git add "simple-project-robot 4/tests/features/agent_finder.robot"
git commit -m "fix: atualiza nome do agente e cenário de busca"
git push origin fix/update-search

gh pr create --title "fix: atualiza nome do agente" --body "Unit ok, E2E deve falhar"
```

Mostre no Actions:
- Jest ✅ (unit passou — o componente renderiza qualquer nome)
- Robot ❌ (E2E falhou — agente não encontrado)
- **PR bloqueado** — não pode fazer merge

---

## Parte 4 — PR 3: corrige tudo e passa

```bash
# ainda na branch fix/update-search
```

Corrija o teste para usar o nome novo:
```
Quando digito "Alex J. Johnson" no campo de busca
Então devo ver 1 agente encontrado
E o card do agente "Alex J. Johnson" deve estar visível
E o status do agente "Alex J. Johnson" deve ser "Available"
```

```bash
git add "simple-project-robot 4/tests/features/agent_finder.robot"
git commit -m "fix: corrige cenário E2E com nome atualizado"
git push origin fix/update-search
```

Pipeline re-executa automaticamente:
- Jest ✅
- Robot ✅
- **PR liberado** → merge

---

## Reset — volta ao estado inicial

```bash
bash reset-demo.sh
```

O script:
- Fecha PRs abertos
- Deleta branches de demo (local e remoto)
- Remove os arquivos `agent_finder_*.robot` do main
- Commita e faz push

Pronto para a próxima apresentação.

---

## Resumo visual do fluxo

```
MAIN (estado inicial — sem arquivos E2E)
  │
  ├─ feat/add-e2e-tests    → Jest ✅  Robot ✅  → MERGE
  │
  ├─ fix/update-search     → Jest ✅  Robot ❌  → BLOQUEADO
  │    └─ (corrige E2E)    → Jest ✅  Robot ✅  → MERGE
  │
  └─ reset-demo.sh         → volta ao estado inicial
```
