# Skill: Flow Completo de Automação E2E

Orquestra o pipeline completo de geração de testes automatizados para o AgentFinder.

## O que este flow faz
1. Analisa o FE e extrai seletores (valida com Playwright ao vivo)
2. Gera cenários Gherkin com dados reais
3. Valida os cenários com Playwright (executa cada fluxo)
4. Gera os arquivos Robot Framework prontos para rodar

## Pré-condições necessárias
- `agent-finder` rodando em `http://localhost:3000`
- Playwright MCP conectado
- Projeto `simple-project-robot 4` existente

## Execução

Execute cada etapa em sequência. **NÃO pule etapas** — cada uma alimenta a próxima.

---

### ETAPA 1 — Análise do Frontend

Você é um engenheiro de QA. Faça o seguinte:

1. Leia os arquivos do `agent-finder/src/` (componentes, tipos, utils)
2. Navegue para `http://localhost:3000` com o Playwright
3. Tire um screenshot para ver o estado atual
4. Inspecione os elementos: campo de busca, filtros, cards de agentes
5. Valide que os seletores do código existem no DOM real

Salve o resultado em `agent-finder/qa-artifacts/01-analise-seletores.md` com:
- URL base confirmada
- Seletores validados (separados por: busca, filtros, card do agente)
- 3 agentes reais com nome, status, equipe e habilidades
- Seletores que não foram encontrados (se houver)

---

### ETAPA 2 — Geração de Cenários

Leia `agent-finder/qa-artifacts/01-analise-seletores.md` e crie **exatamente 3 cenários Gherkin** em PT-BR.

Critérios:
- Cenário 1: busca por nome de agente real
- Cenário 2: filtro por habilidade real
- Cenário 3: filtro combinado (equipe + status) ou filtro por disponibilidade

Use dados reais da análise (nomes, habilidades, equipes reais do sistema).

Salve em `agent-finder/qa-artifacts/02-cenarios-gherkin.md`.

---

### ETAPA 3 — Validação com Playwright

Leia `agent-finder/qa-artifacts/02-cenarios-gherkin.md`.

Para **cada cenário**, execute o fluxo com Playwright:
- Navigate → Fill/Click → Verify

Se um seletor não funcionar: corrija no arquivo `02-cenarios-gherkin.md` e tente novamente.

Só avance para a etapa 4 se **todos os 3 cenários passaram**.

Salve o relatório em `agent-finder/qa-artifacts/03-validacao-playwright.md`.

---

### ETAPA 4 — Geração do Robot Framework

Leia os 3 artefatos de `qa-artifacts/` e os arquivos do projeto `simple-project-robot 4/`.

Gere seguindo exatamente o padrão do projeto existente:

1. `simple-project-robot 4/resources/pages/agent_finder_page.robot`
2. `simple-project-robot 4/resources/steps/agent_finder_steps.robot`  
3. `simple-project-robot 4/tests/features/agent_finder.robot`

Antes de finalizar, verifique a consistência: todos os steps têm keywords, todas as keywords têm implementação.

---

### Conclusão

Ao terminar, confirme:
- [ ] 3 arquivos .robot criados
- [ ] Consistência verificada
- [ ] Comando para executar: `cd "simple-project-robot 4" && robot tests/features/agent_finder.robot`
