# Exercício 2

## Objetivo
Familiarizar-se com a criação de testes unitários em uma aplicação React utilizando TypeScript. O exercício visa garantir que você compreenda como configurar o ambiente de testes e desenvolver testes eficazes para componentes do projeto "Agent Finder".

## Comentários sobre o prompt
O prompt foi elaborado para guiar a criação de testes unitários, focando nas melhores práticas de desenvolvimento. Ele pode ser adaptado para diferentes componentes ou funcionalidades, bastando ajustar os casos de teste conforme necessário. A definição clara do escopo dos testes e a utilização de boas práticas são essenciais para a manutenção de um código de qualidade.

## Arquivos

### .coderignore
Adicione o seguinte conteúdo ao `.coderignore`:

*
!*test*

**Comentário**:  
As linhas incluídas no `.coderignore` configuram o contexto para incluir apenas os arquivos relacionados a testes.  
- A primeira linha (`*`) define que todos os arquivos devem ser ignorados.  
- A segunda linha (`!*test*`) especifica que os arquivos com "test" no caminho não devem ser ignorados.  

Após configurar o `.coderignore`, verifique se o contexto criado está de acordo com a configuração.

### Configurando o prompt

Utilize o prompt abaixo para guiar a criação dos testes unitários:

## Prompt Otimizado

Você é um engenheiro de software sênior especializado em testes unitários utilizando Jest. Sua missão é revisar um projeto de software e identificar todos os componentes que ainda não possuem cobertura de testes unitários. O projeto possui uma pasta chamada `__tests__`, onde há exemplos de testes que seguem as melhores práticas de desenvolvimento. Utilize esses exemplos como referência para garantir a qualidade dos novos testes. Forneça uma lista detalhada dos componentes sem cobertura, priorizando aqueles que são críticos para o funcionamento do sistema.

### Contexto Específico
- Linguagem de programação: JavaScript
- Framework de testes: Jest
- Estrutura do projeto: Segue o padrão MVC
- Objetivo: Maximizar a cobertura de testes unitários

### Exemplos para o Contexto
- Componentes críticos: Autenticação, Processamento de pagamento
- Boas práticas: Testes isolados, uso de mocks e stubs, cobertura de casos de borda

