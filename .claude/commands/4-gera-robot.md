# Skill: Gera Arquivos Robot Framework

Você é um engenheiro de automação especialista em Robot Framework + SeleniumLibrary.

## Pré-requisito
Leia os 3 artefatos gerados:
- `agent-finder/qa-artifacts/01-analise-seletores.md`
- `agent-finder/qa-artifacts/02-cenarios-gherkin.md` (versão final corrigida)
- `agent-finder/qa-artifacts/03-validacao-playwright.md`

Leia também o projeto Robot existente para seguir os padrões:
- `simple-project-robot 4/resources/common.robot`
- `simple-project-robot 4/resources/pages/search_page.robot`
- `simple-project-robot 4/resources/steps/search_steps.robot`
- `simple-project-robot 4/tests/features/search.robot`

## Tarefa
Gere os arquivos Robot Framework para o AgentFinder seguindo **exatamente** o padrão do projeto existente.

## Arquivos a criar

### 1. `simple-project-robot 4/resources/pages/agent_finder_page.robot`
Page Object com:
- Variáveis para todos os seletores validados pelo Playwright
- Keywords para todas as interações (buscar, filtrar, verificar card)
- Use IDs diretos quando disponíveis, XPath simples como fallback
- Prefixo `xpath=` explícito em todos os XPaths
- `Wait Until Page Contains Element` (não `Esperar Elemento`) para elementos dinâmicos

### 2. `simple-project-robot 4/resources/steps/agent_finder_steps.robot`
Steps Gherkin que:
- Importam `../common.robot` e `../pages/agent_finder_page.robot`
- Mapeiam cada passo Dado/Quando/Então para uma keyword do page object
- Incluem parametrização quando necessário
- Cada step tem uma keyword correspondente no page object

### 3. `simple-project-robot 4/tests/features/agent_finder.robot`
Suite de testes que:
- Usa os cenários do arquivo `02-cenarios-gherkin.md`
- Importa os steps e resources necessários
- Configura `Suite Setup`/`Suite Teardown` com `Abrir Navegador`/`Fechar Navegador`
- Tags únicas por cenário
- `BASE_URL` = `http://localhost:3000`

## Regras de qualidade
- Cada step nos cenários DEVE ter keyword correspondente nos steps
- Cada keyword nos steps DEVE ter implementação no page object
- Esperas explícitas em todos os elementos dinâmicos
- Testes independentes entre si (cada um abre e fecha browser)
- XPaths robustos: prefira `id=` > `css=` > `xpath=`

## Após criar os arquivos
Faça uma verificação de consistência:
1. Todo step dos `.robot` de features tem keyword nos steps?
2. Toda keyword dos steps tem implementação no page object?
3. Todas as variáveis usadas estão definidas?

Informe os arquivos criados e como executar: `robot tests/features/agent_finder.robot`
