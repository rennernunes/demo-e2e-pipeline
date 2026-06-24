# Exercício 3

## Objetivo
Implementar a nova feature "Profile" no projeto "Agent Finder". O objetivo deste exercício é criar um modal que exibe as informações detalhadas do perfil de um agente quando o botão "View profile" é clicado. O exercício também visa reforçar boas práticas de desenvolvimento, acessibilidade e integração de novas funcionalidades em projetos existentes.

## Comentários sobre o prompt
O prompt foi elaborado para guiar a implementação da feature "Profile". Ele descreve os requisitos funcionais e não funcionais da nova funcionalidade, além de destacar boas práticas de desenvolvimento. Essa abordagem pode ser reutilizada para criar outras features no projeto, bastando ajustar os detalhes conforme necessário.

## Arquivos

### .coderignore
Adicione o seguinte conteúdo ao `.coderignore`:

*
!*profile*

**Comentário**:  
As linhas incluídas no `.coderignore` configuram o contexto para incluir apenas os arquivos relacionados à feature "Profile".  
- A primeira linha (`*`) define que todos os arquivos devem ser ignorados.  
- A segunda linha (`!*profile*`) especifica que os arquivos com "profile" no caminho não devem ser ignorados.  

Após configurar o `.coderignore`, verifique se o contexto criado está de acordo com a configuração.

### Configurando o prompt

Utilize o prompt abaixo para guiar a implementação da feature:

#### Prompt
Você é um engenheiro de software especializado em desenvolvimento de aplicações React utilizando TypeScript. Sua tarefa é implementar uma nova feature chamada "Profile" no projeto "Agent Finder". Essa feature consiste em um modal que exibe as informações detalhadas do perfil de um agente quando o botão "View profile" é clicado.

### Instruções
Por favor, siga as instruções abaixo:

1. **Descrição da Feature**: 
   - A feature "Profile" deve ser um modal que exibe as informações detalhadas do agente selecionado.
   - O modal deve ser acionado ao clicar no botão:
     ```html
     <button className="agent-card__action-button agent-card__action-button--secondary">
       View profile
     </button>
     ```
   - O modal deve ser reutilizável e seguir as práticas de acessibilidade (ex.: foco no modal ao abrir, fechar com `ESC`, etc.).

2. **Estrutura do Modal**:
   - O modal deve conter:
     - Nome do agente.
     - Status atual (ex.: "Available", "Busy", "Offline").
     - Plataforma (ex.: "Salesforce", "Zendesk", "Internal").
     - Lista de habilidades.
     - Equipes associadas.
     - Métricas (ex.: tempo médio de resposta, satisfação, etc.).
     - Informações de contato (ex.: e-mail, telefone, localização, etc.).
   - Deve incluir um botão para fechar o modal.

3. **Comportamento do Modal**:
   - O modal deve ser exibido ao clicar no botão "View profile".
   - Deve ser possível fechar o modal clicando no botão de fechar ou pressionando a tecla `ESC`.
   - O modal deve ser centralizado na tela e ter um fundo semitransparente para destacar o conteúdo.

4. **Boas Práticas de Implementação**:
   - Utilize componentes reutilizáveis para o modal e seus elementos internos.
   - Garanta que o modal seja acessível, utilizando atributos ARIA e foco gerenciado.
   - Separe a lógica de estado (ex.: abrir/fechar o modal) do componente de apresentação.
   - Utilize TypeScript para tipar as props e os dados do agente.
   - Adicione testes unitários para garantir que o modal funcione corretamente, incluindo:
     - Renderização com os dados corretos.
     - Abertura e fechamento do modal.
     - Interações do usuário, como clique no botão de fechar e tecla `ESC`.

5. **Estilo e Responsividade**:
   - O modal deve ser estilizado para se integrar ao design existente do "Agent Finder".
   - Deve ser responsivo, ajustando-se para diferentes tamanhos de tela.

6. **Integração com o Projeto**:
   - Certifique-se de que o modal seja integrado ao componente `AgentCard` e receba os dados do agente selecionado.
   - Garanta que a feature não quebre funcionalidades existentes.

### Exemplo de uma boa implementação

# Feature "Profile"

## Descrição

A feature "Profile" consiste em um modal que exibe as informações detalhadas do perfil de um agente. Ele é acionado ao clicar no botão "View profile" no componente `AgentCard`. O modal deve ser reutilizável, acessível e responsivo, garantindo uma boa experiência para o usuário.

## Requisitos

### Estrutura do Modal
- Nome do agente.
- Status atual.
- Plataforma.
- Lista de habilidades.
- Equipes associadas.
- Métricas do agente.
- Informações de contato.

### Comportamento
- Abrir ao clicar no botão "View profile".
- Fechar ao clicar no botão de fechar ou pressionar `ESC`.
- Centralizado na tela com fundo semitransparente.

### Boas Práticas
- Componentes reutilizáveis.
- Acessibilidade com atributos ARIA.
- Testes unitários para garantir a funcionalidade.

Utilize o exemplo acima como referência para implementar a feature "Profile" de forma completa e funcional no projeto "Agent Finder".
