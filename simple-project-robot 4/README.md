# Robot Framework - Projeto de Automação de Testes

Este projeto demonstra a automação de testes usando Robot Framework com o site de demonstração "The Internet Herokuapp".

## Estrutura do Projeto

```
.
├── README.md
├── requirements.txt
├── resources
│   ├── common.robot
│   ├── pages
│   │   └── search_page.robot
│   └── steps
│       └── search_steps.robot
└── tests
    └── features
        └── search.robot
```

## Pré-requisitos

- Python 3.7+
- pip (gerenciador de pacotes do Python)
- Navegador Chrome instalado

## Instalação

1. Clone este repositório:
```
git clone <url-do-repositorio>
cd <nome-do-repositorio>
```

2. Crie um ambiente virtual (opcional, mas recomendado):
```
python -m venv venv
```

3. Ative o ambiente virtual:
   - Windows:
   ```
   venv\Scripts\activate
   ```
   - Linux/Mac:
   ```
   source venv/bin/activate
   ```

4. Instale as dependências:
```
pip install -r requirements.txt
```

## Executando os Testes

Para executar todos os testes:
```
robot tests/features/
```

Para executar um teste específico:
```
robot tests/features/search.robot
```

Para executar um cenário específico por tag:
```
robot -i navegacao tests/features/*
```

Para gerar relatórios em uma pasta específica:
```
robot --outputdir results tests/features/
```

## Sobre o Projeto

Este projeto utiliza o site [The Internet Herokuapp](https://the-internet.herokuapp.com/), que é especificamente projetado para testes de automação.

### Funcionalidades Testadas

- Navegação para diferentes páginas de exemplo
- Verificação de elementos em páginas
- Contagem de elementos disponíveis