*** Settings ***
Documentation     Arquivo com recursos comuns para todos os testes
Library           SeleniumLibrary
Library           OperatingSystem
Library           String

*** Variables ***
${BROWSER}        chrome
${TIMEOUT}        10
${BASE_URL}       https://the-internet.herokuapp.com/

*** Keywords ***
Abrir Navegador
    ${options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys
    Call Method    ${options}    add_argument    --no-sandbox
    Call Method    ${options}    add_argument    --disable-dev-shm-usage
    Call Method    ${options}    add_argument    --disable-notifications
    Run Keyword If    '${BROWSER}' == 'headlesschrome'    Evaluate    $options.add_argument('--headless=new')
    Run Keyword If    '${BROWSER}' != 'headlesschrome'    Call Method    ${options}    add_argument    --start-maximized
    Open Browser    about:blank    chrome    options=${options}
    Set Window Size    1280    900
    Set Selenium Timeout    ${TIMEOUT}

Fechar Navegador
    Close All Browsers

Esperar Elemento
    [Arguments]    ${locator}    ${timeout}=${TIMEOUT}
    Wait Until Element Is Visible    ${locator}    timeout=${timeout}

Esperar Elemento Clicável
    [Arguments]    ${locator}    ${timeout}=${TIMEOUT}
    Wait Until Element Is Enabled    ${locator}    timeout=${timeout}

Clicar Com JavaScript
    [Arguments]    ${locator}
    ${element}=    Get WebElement    ${locator}
    Execute Javascript    arguments[0].click();    ARGUMENTS    ${element}

Rolar Até Elemento
    [Arguments]    ${locator}
    ${element}=    Get WebElement    ${locator}
    Execute Javascript    arguments[0].scrollIntoView(true);    ARGUMENTS    ${element}
    Sleep    0.5s

Esperar Carregamento
    Wait Until Element Is Not Visible    css=.loading-indicator    timeout=${TIMEOUT}
    Sleep    0.5s

Verificar Elemento Contém Texto
    [Arguments]    ${locator}    ${texto}
    Element Should Contain    ${locator}    ${texto}

Verificar Elemento Não Contém Texto
    [Arguments]    ${locator}    ${texto}
    Element Should Not Contain    ${locator}    ${texto}

Verificar Elemento Está Visível
    [Arguments]    ${locator}
    Element Should Be Visible    ${locator}

Verificar Elemento Não Está Visível
    [Arguments]    ${locator}
    Element Should Not Be Visible    ${locator}

Limpar Campo De Texto
    [Arguments]    ${locator}
    Clear Element Text    ${locator}

Digitar Texto
    [Arguments]    ${locator}    ${texto}
    Input Text    ${locator}    ${texto}

Pressionar Tecla
    [Arguments]    ${locator}    ${tecla}
    Press Keys    ${locator}    ${tecla}

Selecionar Checkbox
    [Arguments]    ${locator}
    Select Checkbox    ${locator}

Desmarcar Checkbox
    [Arguments]    ${locator}
    Unselect Checkbox    ${locator}

Verificar Checkbox Selecionado
    [Arguments]    ${locator}
    Checkbox Should Be Selected    ${locator}

Verificar Checkbox Não Selecionado
    [Arguments]    ${locator}
    Checkbox Should Not Be Selected    ${locator}

Obter Texto Do Elemento
    [Arguments]    ${locator}
    ${texto}=    Get Text    ${locator}
    RETURN    ${texto}

Contar Elementos
    [Arguments]    ${locator}
    ${elementos}=    Get WebElements    ${locator}
    ${quantidade}=    Get Length    ${elementos}
    RETURN    ${quantidade}

Após o teste
    Fechar Navegador