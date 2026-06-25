*** Settings ***
Documentation     Steps Gherkin para o AgentFinder
Resource          ../common.robot
Resource          ../pages/agent_finder_page.robot

*** Keywords ***
Dado que estou na página do AgentFinder em "${url}"
    Abrir Navegador
    Acessar AgentFinder

Quando digito "${nome}" no campo de busca
    Buscar Agente Por Nome    ${nome}

Quando seleciono a habilidade "${habilidade}" no filtro de Skills
    Selecionar Habilidade No Filtro    ${habilidade}

Quando clico no filtro de disponibilidade "${status}"
    Clicar No Filtro De Disponibilidade    ${status}

Quando clico em "Reset filters"
    Clicar Em Reset Filters

Então devo ver 1 agente encontrado
    Verificar Quantidade De Agentes Encontrados    1    agent found

Então devo ver 2 agentes encontrados
    Verificar Quantidade De Agentes Encontrados    2    agents found

Então devo ver 4 agentes encontrados
    Verificar Quantidade De Agentes Encontrados    4    agents found

Então devo ver 9 agentes encontrados
    Verificar Quantidade De Agentes Encontrados    9    agents found

E o card do agente "${nome}" deve estar visível
    Verificar Card Do Agente Visivel    ${nome}

E o card do agente "${nome}" não deve estar visível
    Verificar Card Do Agente Nao Visivel    ${nome}

E o status do agente "${nome}" deve ser "${status}"
    Verificar Status Do Agente    ${nome}    ${status}

E o time do agente "${nome}" deve ser "${time}"
    Verificar Time Do Agente    ${nome}    ${time}
