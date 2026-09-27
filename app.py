from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configurar a API do Gemini
api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    raise ValueError("GEMINI_API_KEY não encontrada no ficheiro .env")

genai.configure(api_key=api_key)

# Carregar o estoque
with open('estoque.json', 'r', encoding='utf-8') as f:
    estoque = json.load(f)

# Criar a instrução do sistema com o contexto do estoque
system_instruction = f"""Você é um vendedor especialista em produtos Apple de uma loja de tecnologia. 
Seu objetivo é ajudar os clientes a encontrar os produtos ideais baseando-se APENAS no estoque disponível abaixo.

ESTOQUE DISPONÍVEL:
{json.dumps(estoque, ensure_ascii=False, indent=2)}

Regras importantes:
1. Use APENAS os produtos listados no estoque acima para responder sobre disponibilidade, especificações e preços.
2. Se o cliente perguntar sobre produtos que não estão no estoque, responda educadamente que não temos esse produto no momento.
3. Se o cliente apenas cumprimentar (ex: "oi", "tudo bem"), seja educado, apresente-se como assistente da loja e pergunte como pode ajudar.
4. Se a quantidade de um produto for 0, informe que está esgotado.
5. Seja proativo em sugerir produtos similares se o que o cliente quer não estiver disponível.
6. Mantenha um tom profissional, amigável e especializado em tecnologia Apple.
7. Forneça informações técnicas relevantes quando perguntado.
8. Sempre mencione o preço quando falar de um produto disponível.
9. Seja conciso e direto nas respostas."""

model = genai.GenerativeModel('gemini-3.8-flash', system_instruction=system_instruction)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        # Correção 1: Garantir que a leitura de dados não falha se o cabeçalho JSON faltar no frontend
        data = request.get_json(silent=True)
        if data is None:
            data = request.form

        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'Mensagem vazia'}), 400
        
        # Gerar resposta usando o Gemini
        response = model.generate_content(user_message)
        
        # Correção 2: Validação segura para evitar falhas se a IA não devolver texto (filtros de segurança)
        if response.parts:
            return jsonify({'response': response.text})
        else:
            return jsonify({'response': 'Desculpe, a minha ligação falhou. Como posso ajudar com os nossos produtos Apple?'})
    
    except Exception as e:
        # Correção 3: Imprimir o erro exato na consola para depuração
        print(f"ERRO NO SERVIDOR: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)