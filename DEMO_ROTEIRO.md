# Roteiro da Demo — Pipeline QA com Claude Code

---

## Contexto para a apresentação (Renata / ArcelorMittal)

**Fio condutor:** "Você quer sair de apertar um botão à noite para testes rodando sozinhos
no pipeline. Essa demo mostra o caminho — e como IA reduz o atrito de chegar lá."

---

### Os 4 pontos dela e como conectar

**1. Automação na esteira**

Mostre o pipeline ao vivo. A frase que funciona:
> "O QA define os quality gates — a esteira executa sozinha. Ninguém precisa apertar botão."

**Se ela perguntar "o que são quality gates?"**
> "São as regras que determinam se um código pode avançar ou não na esteira.
> Por exemplo: 'só faz merge se os testes unitários passarem' é um quality gate.
> 'Só sobe para produção se o E2E de fumaça passar' é outro.
> O QA decide o que bloqueia — não o desenvolvedor, não o gerente."

**Se ela perguntar como montar a pipe, a estratégia em dois momentos:**
```
1. A cada PR (rápido — máx 20 min)
   └─ unitários: validam a lógica do código alterado      ~2min
   └─ E2E smoke: cobrem só os fluxos críticos do sistema  ~15min
   └─ falhou = bloqueia o merge automaticamente

2. De madrugada (pode demorar — regressão completa)
   └─ suite completa de E2E rodando contra staging        ~2h
   └─ resultado no dashboard pela manhã
   └─ ninguém esperou, ninguém apertou botão
```
> "Dois ritmos: rápido no PR para não travar o time, completo à noite para garantir o sistema."

---

**2. Legado vs produto novo**

Valide o medo dela antes de propor:
> "Faz todo sentido não exigir cobertura alta em código antigo — você para a empresa."

A distinção importante aqui é entre **dois cenários diferentes**:

- **Legado puro** (código de 10 anos que ninguém toca): quality gate só em falha crítica de
  segurança. Não exige cobertura nova. O SonarQube em modo conservador faz isso.

- **Feature nova sendo adicionada num sistema legado**: aí sim, o código novo que está
  sendo escrito já nasce com unitários. Não precisa testar o legado todo — só o que você tocou.

- **Produto digital novo** (como o AgentFinder desta demo): nasce com o padrão completo
  desde o primeiro PR.

> "A regra prática: você não retesta o passado. Você garante que o novo não piora o que existe."

---

**3. Pirâmide de testes**

| Camada | O que testa | Velocidade | Manutenção |
|---|---|---|---|
| Unitário | lógica isolada de uma função | segundos | baixa |
| Integração | dois ou mais componentes juntos | minutos | média |
| E2E smoke | fluxos críticos do usuário (PR) | ~15min | alta |
| E2E regressão | sistema completo (madrugada) | ~2h | alta |

> "Comece pelos E2E nos fluxos que, se quebrarem, ninguém percebe até produção.
> Depois desce a pirâmide conforme o time amadurece."

---

**4. ROI e cultura**

- **Caso do Bill** (evento interno ArcelorMittal): o líder de QA rodou apenas dois testes
  num projeto que a gestão queria enviar para produção sem validação — e encontrou falhas
  críticas de última hora. Isso é o quality gate funcionando como deveria.

- Dado de mercado: bug em produção custa 5x a 100x mais para corrigir do que bug pego em
  desenvolvimento. (IBM Systems Sciences Institute — referência clássica do mercado de QA.)

- Ângulo pessoal para ela:
  > "O analista que aperta botão à noite não consegue crescer — ele está preso numa tarefa
  > que a esteira faz melhor. Automação libera o QA para pensar em qualidade, não em execução."

---

## Pré-requisitos da demo

- `agent-finder` rodando em `http://localhost:3000`
  ```bash
  cd agent-finder && npm start
  ```
- Claude Code aberto na pasta `demo automacao`
- Repositório: https://github.com/rennernunes/demo-e2e-pipeline

---

## Parte 1 — Geração dos testes com Claude Code (skills)

Execute os skills em sequência:

```
/1-analisa-frontend    → lê o código + valida seletores com Playwright ao vivo
/2-gera-cenarios       → gera 3 cenários Gherkin com dados reais
/3-valida-cenarios     → executa cada cenário com Playwright antes de gerar o Robot
/4-gera-robot          → gera os arquivos .robot prontos para rodar
```

Arquivos gerados:
```
simple-project-robot 4/resources/pages/agent_finder_page.robot
simple-project-robot 4/resources/steps/agent_finder_steps.robot
simple-project-robot 4/tests/features/agent_finder.robot
```

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

Mostre no Actions:
1. Jest ✅ → Robot ✅ → PR liberado → merge

---

## Parte 3 — PR 2: quebra o unitário

**Contexto para a audiência:** um dev alterou o componente AgentCard mas o teste unitário
existente captura a regressão antes do merge.

```bash
git checkout main && git pull
git checkout -b fix/break-unit
```

Edite `agent-finder/src/components/AgentFinder/AgentCard.tsx`, linha 185:
```tsx
// antes:
<button className="agent-card__action-button agent-card__action-button--primary">
  Assign
</button>

// depois (renomeia o botão — unit test espera "Assign"):
<button className="agent-card__action-button agent-card__action-button--primary">
  Atribuir
</button>
```

```bash
git add agent-finder/src/components/AgentFinder/AgentCard.tsx
git commit -m "fix: traduz botão Assign para português"
git push origin fix/break-unit

gh pr create --title "fix: traduz botão Assign" --body "Demo: quebra unitário"
```

Mostre no Actions:
- Jest ❌ — teste `renders action buttons` falha (espera "Assign", encontra "Atribuir")
- Robot nem executa (needs: unit-tests)
- **PR bloqueado**

---

## Parte 4 — PR 3: corrige o unitário mas quebra o E2E

**Contexto:** dev corrige o teste unitário para refletir a mudança, mas esquece de
atualizar o cenário E2E que também usa o botão.

Ainda na branch `fix/break-unit`, atualize o teste unitário:

Edite `agent-finder/src/__tests__/components/AgentFinder/AgentCard.test.tsx`, linha 68:
```tsx
// antes:
expect(screen.getByRole('button', { name: /assign/i })).toBeInTheDocument();

// depois:
expect(screen.getByRole('button', { name: /atribuir/i })).toBeInTheDocument();
```

E quebre o E2E — edite `simple-project-robot 4/tests/features/agent_finder.robot`,
troque o nome do agente no cenário 1 para um que não existe:
```
# antes:
Quando digito "Alex Johnson" no campo de busca
Então devo ver 1 agente encontrado

# depois:
Quando digito "Alex Johnson Silva" no campo de busca
Então devo ver 1 agente encontrado
```

```bash
git add agent-finder/src/__tests__/components/AgentFinder/AgentCard.test.tsx
git add "simple-project-robot 4/tests/features/agent_finder.robot"
git commit -m "fix: atualiza unit test + cenário E2E (incompleto)"
git push origin fix/break-unit
```

Mostre no Actions:
- Jest ✅ (unitário corrigido)
- Robot ❌ (E2E não encontra o agente)
- **PR ainda bloqueado**

---

## Parte 5 — Corrige o E2E e passa tudo

```bash
# reverte o nome no cenário E2E:
# "Alex Johnson Silva" → "Alex Johnson"
```

Edite `simple-project-robot 4/tests/features/agent_finder.robot` de volta:
```
Quando digito "Alex Johnson" no campo de busca
Então devo ver 1 agente encontrado
```

```bash
git add "simple-project-robot 4/tests/features/agent_finder.robot"
git commit -m "fix: corrige cenário E2E com nome correto"
git push origin fix/break-unit
```

Mostre no Actions:
- Jest ✅ → Robot ✅ → **PR liberado** → merge

---

## Reset — volta ao estado inicial

```bash
bash reset-demo.sh
```

O script fecha os PRs, deleta as branches e remove os arquivos E2E gerados do main.
Pronto para a próxima apresentação.

---

## Resumo visual

```
MAIN (estado inicial — sem arquivos E2E)
  │
  ├─ feat/add-e2e-tests  → Jest ✅  Robot ✅  → MERGE
  │
  ├─ fix/break-unit
  │    ├─ commit 1: muda botão     → Jest ❌  bloqueado
  │    ├─ commit 2: corrige unit   → Jest ✅  Robot ❌  bloqueado
  │    └─ commit 3: corrige E2E   → Jest ✅  Robot ✅  → MERGE
  │
  └─ reset-demo.sh  →  estado inicial restaurado
```
