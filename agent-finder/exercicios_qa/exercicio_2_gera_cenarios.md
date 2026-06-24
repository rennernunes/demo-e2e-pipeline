Configurações iniciais:

- Deve-se rodar no projeto AGENT-FINDER

## Arquivo config.yml

coder:
  persona: |
    You are an expert coder. Responda em PT-BR
  model: flow-bedrock-claude-37-sonnet
  context:
    mode: full
    scope: all
    selection:
      model: flow-gemini-2.0-flash
      step: 10
      limit: 20

## Arquivo .coderignore
Ignore somente a pasta node_modules/ e permita todos os outros arquivos

---

## PROMPT COMPLETO:

## Objetivo
Desenvolver um plano de testes abrangente para o componente Agent Finder, incluindo cenários de teste em formato Gherkin (PT-BR) que possam ser usados tanto para testes manuais quanto para automação. Uma observação para o de automação, se;cione poucos cenários que sejam relevantes!

## Instruções
Com base na história de usuário do Agent Finder, crie cenários de teste em formato Gherkin (Dado/Quando/Então) que cubram as principais funcionalidades e fluxos do usuário. Foque nos seguintes aspectos:

1. Busca e filtragem de agentes
2. Visualização de informações dos agentes
3. Comportamento da interface em diferentes estados
4. Fluxos completos de uso da aplicação
5. Utilize mdados reais do sistema nos cenários
6. No máximo 3 cenários para reaizarmos automação E2E

### História: 
**Contexto:**  
O AgentFinder é um sistema para gerenciar e localizar agentes de atendimento ao cliente, permitindo que supervisores e coordenadores encontrem rapidamente os agentes mais adequados para atender demandas específicas. O sistema precisa oferecer funcionalidades de busca, filtragem e visualização de informações detalhadas sobre cada agente.

**Descrição:**  
Como supervisor de atendimento, quero poder encontrar rapidamente agentes disponíveis com habilidades específicas para atender demandas de clientes, visualizando informações relevantes como status, carga de trabalho atual e equipe.

**Regras de Negócios:**  
- **Regra 1.1**: Os agentes devem ser classificados por status (disponível, ocupado, offline).
- **Regra 1.2**: Cada agente deve ter um conjunto de habilidades associadas (ex: suporte técnico, atendimento ao cliente, vendas).
- **Regra 1.3**: A carga de trabalho do agente deve ser representada em porcentagem (0-100%).
- **Regra 1.4**: Agentes devem estar associados a equipes específicas.

**Casos de Teste:**  

| Caso de Teste                        | Dados de Entrada                                              | Etapas                                                                                     | Resultado Esperado                                                                 | Pré-condições                                                                            |
|--------------------------------------|--------------------------------------------------------------|--------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| Busca de Agente por Nome             | Nome: "Carlos Silva"                                         | - Acessar a página principal.  
  - Digitar o nome na barra de busca.                                    | O sistema exibe o card do agente "Carlos Silva".                                       | O agente deve estar cadastrado no sistema.                                        |
| Filtragem por Habilidade             | Habilidade: "Suporte Técnico"                                | - Acessar a página principal.  
  - Selecionar a habilidade "Suporte Técnico" no filtro.                | O sistema exibe apenas agentes com a habilidade "Suporte Técnico".                    | Devem existir agentes com a habilidade selecionada.                              |
| Filtragem por Disponibilidade        | Status: "Disponível"                                         | - Acessar a página principal.  
  - Selecionar o status "Disponível" no filtro.                          | O sistema exibe apenas agentes com status "Disponível".                               | Devem existir agentes com status "Disponível".                                   |
| Combinação de Filtros                | Equipe: "Vendas", Status: "Disponível"                       | - Acessar a página principal.  
  - Selecionar a equipe "Vendas" e o status "Disponível".                | O sistema exibe apenas agentes da equipe "Vendas" com status "Disponível".            | Devem existir agentes que atendam a ambos os critérios.                          |

**Critérios de Aceite:**  
- O sistema deve permitir busca textual por nome ou outras informações do agente.
- Deve ser possível filtrar agentes por habilidades, equipes e disponibilidade.
- Os filtros devem funcionar de forma combinada (AND lógico).
- Cada card de agente deve exibir: nome, foto, status, equipe, habilidades e carga de trabalho.
- O sistema deve exibir estados apropriados para carregamento, erro e resultados vazios.
- A interface deve ser responsiva e funcionar em dispositivos móveis e desktop.

