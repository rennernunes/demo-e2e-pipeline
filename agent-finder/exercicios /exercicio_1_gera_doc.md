# Exercício 1

## Objetivo
Primeiro contato com o coder framework.

A proposta é gerar uma documentação técnica detalhada sobre uma funcionalidade do projeto "Agent Finder". O objetivo é exercitar a configuração do arquivo `.coderignore` e observar o funcionamento do coder-framework no contexto do projeto.

## Comentários sobre o prompt
Note que o prompt está configurado para documentar a funcionalidade "Agent Finder". Caso seja necessário documentar outra funcionalidade, basta substituir "Agent Finder" no prompt por outra funcionalidade desejada.  
Ao criar documentações técnicas, é importante definir o público-alvo e o conteúdo esperado, garantindo clareza e padronização.  
Quando obtiver um resultado satisfatório, você pode incrementar o prompt com exemplos, como demonstrado aqui.

## Arquivos

### .coderignore
Adicione o seguinte conteúdo ao `.coderignore`:

*
!src/

**Comentário**:  
As linhas incluídas no `.coderignore` configuram o contexto para incluir apenas os arquivos relacionados à funcionalidade "Agent Finder".  
- A primeira linha (`*`) define que todos os arquivos devem ser ignorados.  
- A segunda linha (`!*Agent*`) especifica que os arquivos com "Agent" no caminho não devem ser ignorados.  

Após configurar o `.coderignore`, verifique se o contexto criado está de acordo com a configuração.

### Configurando o prompt

Utilize o prompt abaixo para gerar a documentação técnica:

#### Prompt
Você é um engenheiro de software especializado em documentação técnica.

Sua tarefa é criar uma documentação detalhada das funcionalidades implementadas no projeto "Agent Finder".  
Público-alvo: Esta documentação deve ser destinada ao time técnico, fornecendo uma visão clara da arquitetura, componentes e fluxos de dados, sem omitir detalhes técnicos relevantes.

### Instruções
Por favor, siga as instruções abaixo:

1. **Introdução**: Descreva brevemente o objetivo do projeto "Agent Finder" e sua importância.
2. **Arquitetura do Projeto**: Explique a estrutura do projeto, incluindo a organização dos componentes principais e como eles interagem.
3. **Componentes Principais**: Detalhe os componentes principais (`AgentCard`, `AgentFinder`, `FilterPanel`, etc.), incluindo suas props, estados internos e funções principais.
4. **Fluxo de Dados**: Descreva como os dados são gerenciados, incluindo chamadas de API, manipulação de estado e aplicação de filtros.
5. **Funcionalidades de Filtro e Pesquisa**: Explique como os filtros e a pesquisa são implementados, destacando o uso de debounce e a aplicação de critérios de busca.
6. **Acessibilidade e Responsividade**: Destaque as práticas de acessibilidade e design responsivo adotadas no projeto.

### Exemplo de uma boa documentação

# Documentação Técnica do Projeto "Agent Finder"

## Introdução

O "Agent Finder" é uma aplicação React desenvolvida para gerenciar e localizar agentes com base em critérios como disponibilidade, habilidades e equipes. Ele permite que os usuários filtrem e pesquisem agentes de forma eficiente, otimizando o gerenciamento de equipes.

## Arquitetura do Projeto

O projeto é estruturado em componentes reutilizáveis organizados em pastas. Ele utiliza React com TypeScript, gerenciamento de estado local e integração com APIs para buscar dados de agentes. A aplicação é responsiva e acessível, garantindo uma boa experiência para todos os usuários.

## Componentes Principais

### 1. `AgentCard`
- **Descrição**: Renderiza informações sobre um agente, como nome, status, habilidades e equipes.
- **Props**:
  - `agent`: Objeto contendo os dados do agente.
- **Funções Internas**:
  - `formatLastActive`: Formata o timestamp da última atividade do agente.
  - `getPlatformIcon`: Retorna o ícone correspondente à plataforma do agente.

### 2. `AgentFinder`
- **Descrição**: Componente principal que gerencia o estado global, busca dados de agentes e aplica filtros e pesquisa.
- **Estados**:
  - `agents`: Lista de agentes carregados.
  - `filteredAgents`: Lista de agentes após aplicação de filtros e pesquisa.
  - `filters`: Estado dos filtros aplicados.
- **Funções Internas**:
  - `loadAgents`: Busca os dados dos agentes via API.
  - `handleSearch`: Aplica debounce na pesquisa.
  - `handleFilterChange`: Atualiza os filtros aplicados.

### 3. `FilterPanel`
- **Descrição**: Gerencia os filtros de disponibilidade, habilidades, equipes e plataformas.
- **Props**:
  - `filters`: Estado atual dos filtros.
  - `onFilterChange`: Função para atualizar os filtros.

## Fluxo de Dados

1. **Carregamento de Dados**:
   - Os dados dos agentes são buscados da API `fetchAgents` e armazenados no estado global.
2. **Aplicação de Filtros**:
   - Os filtros são aplicados usando a função `filterAgents`, que filtra os agentes com base nos critérios selecionados.
3. **Pesquisa**:
   - A pesquisa é implementada com debounce para evitar chamadas excessivas durante a digitação.

## Funcionalidades de Filtro e Pesquisa

- **Filtros**:
  - Disponibilidade: Filtra agentes por status (`available`, `busy`, `offline`).
  - Habilidades: Filtra agentes por habilidades específicas.
  - Equipes: Filtra agentes por equipes associadas.
  - Plataformas: Filtra agentes por plataformas como Salesforce e Zendesk.
- **Pesquisa**:
  - Permite buscar agentes por nome ou habilidades.
  - Implementada com debounce para otimizar a experiência do usuário.

## Acessibilidade e Responsividade

- **Acessibilidade**:
  - Uso de atributos `aria` para melhorar a navegação por leitores de tela.
  - Atalhos de teclado para facilitar a interação (ex.: `Alt+A` para alternar o filtro de disponibilidade).
- **Responsividade**:
  - Layout adaptado para diferentes tamanhos de tela, com comportamento específico para dispositivos móveis e desktops.

Utilize o exemplo acima como referência para criar uma documentação técnica completa e detalhada que atenda às necessidades do time técnico.
