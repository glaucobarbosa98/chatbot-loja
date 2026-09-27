# Apple Store Chatbot

Chatbot full-stack para loja de tecnologia especializada em produtos Apple, utilizando Flask (backend) e HTML/CSS/Vanilla JS (frontend) com integração com a API Gemini do Google.

## Stack Tecnológica

- **Backend**: Python + Flask
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **IA**: Google Gemini API (gemini-3.8-flash)

## Estrutura do Projeto

```
chatbot-loja/
├── app.py                 # Backend Flask com integração Gemini
├── estoque.json          # Catálogo de produtos Apple
├── requirements.txt      # Dependências Python
├── .env                 # Variáveis de ambiente (API Key)
├── .gitignore           # Arquivos ignorados pelo Git
├── templates/
│   └── index.html       # Interface do chat
└── static/
    ├── style.css        # Estilos (design dark mode tech)
    └── script.js        # Lógica do frontend (fetch, captura de mensagens)
```

## Como Rodar o Projeto

### 1. Instalar Dependências

```bash
pip install -r requirements.txt
```

### 2. Configurar API Key

1. Obtenha uma API Key gratuita em: https://makersuite.google.com/app/apikey
2. Abra o arquivo `.env` e substitua `sua_chave_api_aqui` pela sua chave:

```
GEMINI_API_KEY=sua_chave_real_aqui
```

### 3. Executar o Servidor

```bash
python app.py
```

O servidor será iniciado em `http://127.0.0.1:5000`

### 4. Acessar o Chatbot

Abra o navegador e acesse: `http://127.0.0.1:5000`

## Funcionalidades

- Chat interativo com IA especializada em produtos Apple
- Catálogo com iPhones, MacBooks e Apple Watches
- Verificação de disponibilidade em tempo real
- Interface moderna com design dark mode
- Respostas baseadas exclusivamente no estoque disponível

## Produtos no Estoque

- **iPhones**: 15 Pro Max, 14 Pro, 13 (incluindo esgotado)
- **MacBooks**: Pro 14" (M3 Pro), Air 13" (M2)
- **Apple Watches**: Series 9, Ultra 2

## Notas

- O iPhone 13 está esgotado (quantidade: 0) para demonstrar tratamento de produtos indisponíveis
- A IA responde apenas sobre produtos listados no `estoque.json`
- Mantenha o arquivo `.env` seguro e nunca o commit para o repositório
