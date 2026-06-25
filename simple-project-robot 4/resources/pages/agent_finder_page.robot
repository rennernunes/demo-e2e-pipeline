*** Settings ***
Documentation     Page Object para o AgentFinder - http://localhost:3000
Library           SeleniumLibrary

*** Variables ***
${BASE_URL_AGENT}         http://localhost:3000

${CAMPO_BUSCA}            css=.search-bar__input
${RESULTADO_CONTAGEM}     css=.agent-finder__results-count
${BOTAO_RESET}            css=.filter-panel__reset-button
${TODOS_CARDS}            css=.agent-card
${TODOS_NOMES}            css=.agent-card__name

*** Keywords ***
Acessar AgentFinder
    Go To    ${BASE_URL_AGENT}
    Wait Until Page Contains Element    ${CAMPO_BUSCA}    timeout=10s
    Sleep    1s

Buscar Agente Por Nome
    [Arguments]    ${nome}
    Wait Until Element Is Visible    ${CAMPO_BUSCA}    timeout=10s
    Input Text    ${CAMPO_BUSCA}    ${nome}
    Sleep    1s

Selecionar Habilidade No Filtro
    [Arguments]    ${habilidade}
    ${label}=    Set Variable    xpath=//label[.//span[@class='skills-filter__label' and text()='${habilidade}']]
    Wait Until Page Contains Element    ${label}    timeout=10s
    Click Element    ${label}
    Sleep    1s

Clicar No Filtro De Disponibilidade
    [Arguments]    ${status}
    ${botao}=    Set Variable    xpath=//button[contains(@class,'availability-filter__option') and .//span[text()='${status}']]
    Wait Until Page Contains Element    ${botao}    timeout=10s
    Click Element    ${botao}
    Sleep    1s

Clicar Em Reset Filters
    Wait Until Page Contains Element    ${BOTAO_RESET}    timeout=10s
    Click Element    ${BOTAO_RESET}
    Sleep    1s

Verificar Quantidade De Agentes Encontrados
    [Arguments]    ${quantidade}    ${sufixo}=agents found
    ${texto_esperado}=    Set Variable    ${quantidade} ${sufixo}
    Wait Until Element Contains    ${RESULTADO_CONTAGEM}    ${texto_esperado}    timeout=10s
    Sleep    1.5s

Verificar Card Do Agente Visivel
    [Arguments]    ${nome}
    ${card}=    Set Variable    xpath=//h3[@class='agent-card__name' and text()='${nome}']
    Wait Until Page Contains Element    ${card}    timeout=10s
    Element Should Be Visible    ${card}
    Sleep    1s

Verificar Card Do Agente Nao Visivel
    [Arguments]    ${nome}
    ${card}=    Set Variable    xpath=//h3[@class='agent-card__name' and text()='${nome}']
    Page Should Not Contain Element    ${card}
    Sleep    1s

Verificar Status Do Agente
    [Arguments]    ${nome}    ${status_esperado}
    ${seletor}=    Set Variable    xpath=//div[@class='agent-card'][.//h3[text()='${nome}']]//span[@class='status-indicator__label']
    Wait Until Page Contains Element    ${seletor}    timeout=10s
    Element Should Contain    ${seletor}    ${status_esperado}
    Sleep    1s

Verificar Time Do Agente
    [Arguments]    ${nome}    ${time_esperado}
    ${seletor}=    Set Variable    xpath=//div[@class='agent-card'][.//h3[text()='${nome}']]//div[@class='agent-card__teams-list']
    Wait Until Page Contains Element    ${seletor}    timeout=10s
    Element Should Contain    ${seletor}    ${time_esperado}
    Sleep    1s
