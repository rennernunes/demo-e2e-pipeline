*** Settings ***
Documentation     Page Object para a página de busca do site The Internet Herokuapp
Library           SeleniumLibrary

*** Variables ***
${SEARCH_INPUT}       id=search-input
${SEARCH_BUTTON}      id=search-button
${AVAILABLE_EXAMPLES}    css=ul li a
${PAGE_HEADING}       css=h1.heading

*** Keywords ***
Acessar Página Inicial
    Go To    ${BASE_URL}
    Wait Until Element Is Visible    ${PAGE_HEADING}    timeout=10s
    Sleep    1s    # Pequena pausa para garantir que a página carregou completamente

Navegar Para Funcionalidade
    [Arguments]    ${funcionalidade}
    ${link_locator}=    Set Variable    //a[contains(text(),'${funcionalidade}')]
    Wait Until Element Is Visible    ${link_locator}    timeout=10s
    Scroll Element Into View    ${link_locator}
    Sleep    0.5s    # Pequena pausa para garantir que o elemento está visível após rolagem
    Click Element    ${link_locator}
    Sleep    1s    # Pequena pausa para garantir que a navegação foi concluída
    
Verificar Se Página Contém
    [Arguments]    ${texto}
    Wait Until Page Contains    ${texto}    timeout=10s
    Page Should Contain    ${texto}

Verificar Título Da Página
    [Arguments]    ${titulo_esperado}
    Wait Until Title Contains    ${titulo_esperado}    timeout=10s
    ${titulo_atual}=    Get Title
    Should Contain    ${titulo_atual}    ${titulo_esperado}

Verificar Heading Da Página
    [Arguments]    ${texto_esperado}
    Wait Until Element Is Visible    ${PAGE_HEADING}    timeout=10s
    ${heading_text}=    Get Text    ${PAGE_HEADING}
    Should Contain    ${heading_text}    ${texto_esperado}

Contar Exemplos Disponíveis
    [Arguments]    ${numero_minimo}=10
    Wait Until Element Is Visible    ${AVAILABLE_EXAMPLES}    timeout=10s
    Sleep    1s    # Garantir que todos os elementos estão carregados
    ${elementos}=    Get WebElements    ${AVAILABLE_EXAMPLES}
    ${count}=    Get Length    ${elementos}
    Should Be True    ${count} >= ${numero_minimo}    Esperava pelo menos ${numero_minimo} exemplos, mas encontrou ${count}
    RETURN    ${count}