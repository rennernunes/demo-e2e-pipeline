*** Settings ***
Documentation     Testes E2E do AgentFinder - http://localhost:3000
Resource          ../../resources/steps/agent_finder_steps.robot
Test Teardown     Após o teste

*** Test Cases ***
Cenário: Buscar agente pelo nome completo e verificar o card exibido
    [Documentation]    Busca por nome retorna o agente correto com status e time esperados
    [Tags]    e2e    busca
    Dado que estou na página do AgentFinder em "http://localhost:3000"
    Quando digito "Alex Johnson" no campo de busca
    Então devo ver 1 agente encontrado
    E o card do agente "Alex Johnson" deve estar visível
    E o status do agente "Alex Johnson" deve ser "Available"
    E o time do agente "Alex Johnson" deve ser "Customer Success"

Cenário: Filtrar agentes pela habilidade Technical Support e verificar resultados
    [Documentation]    Filtro por skill exibe apenas agentes com a habilidade selecionada
    [Tags]    e2e    filtro    skill
    Dado que estou na página do AgentFinder em "http://localhost:3000"
    Quando seleciono a habilidade "Technical Support" no filtro de Skills
    Então devo ver 2 agentes encontrados
    E o card do agente "Jamie Smith" deve estar visível
    E o card do agente "Casey Brown" deve estar visível
    E o card do agente "Alex Johnson" não deve estar visível

Cenário: Filtrar agentes disponíveis e limpar filtros
    [Documentation]    Filtro de disponibilidade exibe apenas agentes Available e reset restaura todos
    [Tags]    e2e    filtro    disponibilidade
    Dado que estou na página do AgentFinder em "http://localhost:3000"
    Quando clico no filtro de disponibilidade "Available"
    Então devo ver 4 agentes encontrados
    E o card do agente "Jordan Miller" deve estar visível
    E o card do agente "Jamie Smith" não deve estar visível
    Quando clico em "Reset filters"
    Então devo ver 9 agentes encontrados
