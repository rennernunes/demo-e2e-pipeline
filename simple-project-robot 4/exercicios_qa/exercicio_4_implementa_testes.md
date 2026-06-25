Configurações iniciais:

- Deve-se rodar no projeto ROBOT

---


# Prompt para Automação de Testes

## Objetivo
Implementar scripts de automação de testes completos baseados na documentação de análise do projeto, história de usuário e cenários de teste selecionados.

## Entradas
1. Documentação de análise do projeto (gerada pelo prompt anterior)
2. História de usuário
3. Cenários de teste selecionados
4. Estrutura atual do projeto
5. URL = http://localhost:3000 

## Instruções
Por favor, implemente scripts de automação de testes completos para os cenários fornecidos, seguindo a estrutura e padrões do projeto existente. A implementação deve incluir:


### 1. Page Objects
Crie ou atualize arquivos de Page Objects com:
- Variáveis para todos os seletores necessários, siga o padrão da documentação
- Keywords para todas as interações com elementos
- Verificações (assertions) necessárias

### 2. Step Definitions
Steps em formato Gherkin que:
- Mapeiem para as keywords dos Page Objects
- Sigam o padrão "Dado/Quando/Então" (Given/When/Then)
- Incluam parametrização quando necessário

### 3. Casos de Teste
Crie arquivos de teste que:
- Usem os cenários fornecidos
- Usem as step definitions criadas
- Incluam tags apropriadas
- Configurem setup e teardown necessários

### 4. Recursos Comuns
Atualize ou crie recursos comuns que:
- Definam variáveis globais necessárias
- Implementem keywords reutilizáveis
- Configurem bibliotecas e dependências

### 5. Locators Xpath ou IDs
1. Substitua expressões XPath complexas como `${AGENT_NAME}[text()="Alex Johnson"]` por expressões completas como `xpath=//h3[@class="agent-card__name" and text()="${nome_agente}"]`
2. Usea a abordagem de construir o XPath em etapas, primeiro localizando o card do agente e depois os elementos dentro dele
3. Adicione prefixos `xpath=` explícitos para todos os locators XPath
4. Use `Wait Until Page Contains Element` em vez de `Esperar Elemento` para locators mais complexos
5. Caso tenha o ID direto, utilize!!
6. Seja simples


## Requisitos Técnicos
1. Garanta que CADA step nos cenários tenha uma implementação correspondente nos arquivos de steps
2. Cada keyword no arquivo de steps deve ter uma implementação completa no arquivo de page objects
3. Implemente verificações visuais para elementos como barras de progresso, indicadores de status, etc.
4. Adicione tratamento de erros para casos onde elementos não são encontrados
5. Implemente esperas explícitas para todos os elementos dinâmicos
6. Para verificações de elementos não visíveis, considere tanto elementos invisíveis quanto elementos que não estão no DOM
7. Ao final da implementação, faça uma verificação de consistência entre todos os arquivos

## Formato de Saída
Para cada arquivo a ser criado ou modificado, forneça:

```
[coder:end]
### caminho/para/arquivo.robot [coder:save]
*** Settings ***
Documentation     Descrição do arquivo
...               Informações adicionais
Resource          ../caminho/para/recurso.robot
Library           SeleniumLibrary

*** Variables ***
${VARIAVEL}       valor

*** Keywords ***
Nome da Keyword
    [Arguments]    ${argumento}
    [tags]
    Ação    ${argumento}
[coder:end]
```

## Considerações Adicionais
- Garanta que todos os seletores sejam robustos e únicos
- Esperas explícitas sempre nos elementos
- Verifique se todas as dependências necessárias estão incluídas
- Mantenha os testes independentes entre si
- Não esqueça de implementar nenhuma keyword
- Se atente também as tags que devem ser unicas nos cenários

---

<INFIRA A DOCUMENTAÇÃO DO EXERCICIO 3 AQUI>

---

<INSIRA UM CENARIO DO EXERCICIO 2 AQUI>