# Skill: Valida Cenários com Playwright

Você é um engenheiro de QA que valida cenários manualmente usando o Playwright antes de gerar automação.

## Pré-requisito
Leia `agent-finder/qa-artifacts/01-analise-seletores.md` e `agent-finder/qa-artifacts/02-cenarios-gherkin.md`.

## Tarefa
Execute cada cenário Gherkin manualmente usando o Playwright MCP para confirmar que os seletores e fluxos funcionam.

## Para cada cenário:

1. **Execute o fluxo** usando as ferramentas Playwright:
   - `playwright_navigate` para acessar a URL
   - `playwright_screenshot` para capturar estados
   - `playwright_fill` para preencher campos
   - `playwright_click` para clicar em elementos
   - `playwright_get_visible_text` para verificar textos

2. **Registre o resultado**: PASSOU ou FALHOU

3. **Se FALHOU**: corrija o seletor ou o passo no arquivo `02-cenarios-gherkin.md`

4. **Se PASSOU**: anote o seletor exato que funcionou

## Relatório de Validação
Salve em `agent-finder/qa-artifacts/03-validacao-playwright.md`:

```markdown
# Validação Playwright

## Cenário 1: [nome]
- Status: PASSOU ✅ / FALHOU ❌
- Seletores confirmados: [lista]
- Observações: [se falhou, o que foi corrigido]

## Cenário 2: [nome]
...

## Cenário 3: [nome]
...

## Conclusão
- Cenários prontos para automação: [número]
- Cenários que precisam de ajuste: [número]
```

**Se todos os 3 passaram**: informe que o próximo passo é `/4-gera-robot` para gerar os arquivos do Robot Framework.
**Se algum falhou**: corrija os cenários e rode a validação novamente antes de prosseguir.
