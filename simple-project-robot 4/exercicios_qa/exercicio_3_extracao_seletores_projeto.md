Configurações iniciais:

- Deve-se rodar no projeto AGENT-FINDER

---

## PROMPT COMPLETO:

# Prompt para Análise de Projeto de Automação

## Objetivo
Analisar um projeto de automação de testes e uma história de usuário para identificar elementos necessários para implementação de testes automatizados.

## Instruções
Por favor, analise o código-fonte do projeto de automação e a história de usuário fornecida, e identifique os seguintes elementos:

1. **Seletores e Identificadores**:
   - Todos os XPaths relativos ou IDs exatos

2. **Componentes da Interface**:
   - Botões
   - Campos de entrada
   - Dropdowns
   - Checkboxes
   - Tabelas
   - Modais
   - Outros elementos interativos

3. **URLs**:
   - URLs base
   - Endpoints
   - Rotas específicas mencionadas

4. **Fluxos de Navegação**:
   - Sequências de passos mencionados na história
   - Pontos de verificação (assertions)

5. **Dados de Teste**:
   - Valores de entrada mencionados
   - Resultados esperados
   - Condições prévias necessárias

## Formato de Saída
Por favor, organize sua análise no seguinte formato:

```
# Análise do Projeto para Automação

## Seletores e Identificadores
- XPath: //elemento[@atributo='valor']
- ID: id_elemento
- Name: nome_elemento
- Class: classe_elemento

## URLs
- URL Base: https://exemplo.com
- Endpoint de Login: /login
- Rota de Perfil: /profile/{id}

## Fluxos de Navegação
1. Acessar página inicial
2. Preencher formulário de login
3. Verificar redirecionamento para dashboard

## Dados de Teste
- Email: usuario@exemplo.com
- Senha: senha123
- Resultado esperado: "Login bem-sucedido"
```

## Considerações Adicionais
- Identifique padrões de nomenclatura no projeto
- Não crie nada que esteja fora dos padrões
- Observe estruturas de Page Objects ou similares
- Verifique frameworks e bibliotecas utilizadas
- Note convenções de codificação específicas do projeto

Esta análise servirá como base para a criação de scripts de automação alinhados com a estrutura do projeto existente e os requisitos da história de usuário.