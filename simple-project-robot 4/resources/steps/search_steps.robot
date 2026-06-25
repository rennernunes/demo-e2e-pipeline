*** Settings ***
Documentation     Implementação dos passos para navegação no site The Internet Herokuapp
Resource          ../common.robot
Resource          ../pages/search_page.robot

*** Keywords ***
Dado que estou na página inicial do site de demonstração
    Abrir Navegador
    Acessar Página Inicial

Quando navego para a funcionalidade "${funcionalidade}"
    Navegar Para Funcionalidade    ${funcionalidade}

Então devo ver a página da funcionalidade "${funcionalidade}"
    Verificar Se Página Contém    ${funcionalidade}

E a página deve conter o texto "${texto}"
    Verificar Se Página Contém    ${texto}

E o título da página deve conter "${titulo}"
    Verificar Título Da Página    ${titulo}

E o heading da página deve ser "${heading}"
    Verificar Heading Da Página    ${heading}

Então devo ver pelo menos "${numero}" exemplos disponíveis
    ${numero_int}=    Convert To Integer    ${numero}
    Contar Exemplos Disponíveis    ${numero_int}