Configurações iniciais:

- Deve-se rodar no projeto AGENT-FINDER

## Arquivo config.yml

coder:
  persona: |
    You are an expert coder. Responda em PT-BR
  model: flow-gemini-2.5-pro
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

# Prompt para Documentação de QA

Você é um engenheiro de qualidade (QA) especialista em documentação de testes.

Sua tarefa é criar uma documentação detalhada para novos QAs entenderem o projeto AgentFinder, incluindo fluxos de trabalho, casos de teste e critérios de validação.

### Instruções
Por favor, siga as instruções abaixo:

1. **Visão Geral do Projeto**: Descreva o propósito e funcionalidade principal do AgentFinder.

2. **Arquitetura e Componentes**: Explique a estrutura do projeto e como os componentes se relacionam.

3. **Fluxos Principais**: Detalhe os fluxos de usuário mais importantes que precisam ser testados:
   - Busca de agentes
   - Filtragem de resultados
   - Visualização de detalhes dos agentes

4. **Casos de Teste Prioritários**: Liste os casos de teste essenciais, incluindo:
   - Testes de funcionalidade
   - Testes de interface

5. **Cenários de Erro**: Documente os principais cenários de erro e como o sistema deve se comportar.

6. **Critérios de Aceitação**: Defina os critérios que determinam se uma funcionalidade está pronta para produção.

Forneça exemplos específicos sempre que possível e organize a documentação de forma clara e estruturada para facilitar a consulta rápida por novos membros da equipe de QA.