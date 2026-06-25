*** Settings ***
Documentation     Testes de navegação no site The Internet Herokuapp
Resource          ../../resources/steps/search_steps.robot
Test Teardown     Após o teste

*** Test Cases ***
# Cenário: Navegar para a funcionalidade de Login
#     [Documentation]    Teste de navegação para a página de login
#     [Tags]    navegacao    login    regressao
#     Dado que estou na página inicial do site de demonstração
#     Quando navego para a funcionalidade "Form Authentication"
#     Então devo ver a página da funcionalidade "Login Page"
#     E a página deve conter o texto "Username"
#     E a página deve conter o texto "Password"

Cenário: Navegar para a funcionalidade de Checkboxes
    [Documentation]    Teste de navegação para a página de checkboxes
    [Tags]    navegacao    elementos    checkbox
    Dado que estou na página inicial do site de demonstração
    Quando navego para a funcionalidade "Checkboxes"
    Então devo ver a página da funcionalidade "Checkboxes"
    E a página deve conter o texto "checkbox"

# Cenário: Verificar exemplos disponíveis na página inicial
#     [Documentation]    Teste para verificar a quantidade de exemplos disponíveis
#     [Tags]    navegacao    home    contagem
#     Dado que estou na página inicial do site de demonstração
#     Então devo ver pelo menos "10" exemplos disponíveis
#     E a página deve conter o texto "Welcome to the-internet"