const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');

// Adicionar mensagem ao chat
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = `<p>${content}</p>`;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll para a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Mostrar indicador de digitação
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.id = 'typingIndicator';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'typing-indicator';
    typingContent.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    typingDiv.appendChild(typingContent);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remover indicador de digitação
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Enviar mensagem para o backend
async function sendMessage(message) {
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar mensagem');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Erro:', error);
        return 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.';
    }
}

// Event listener para o formulário
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    if (!message) return;

    // Adicionar mensagem do usuário
    addMessage(message, true);
    messageInput.value = '';
    
    // Desabilitar input enquanto processa
    messageInput.disabled = true;
    
    // Mostrar indicador de digitação
    showTypingIndicator();
    
    // Enviar mensagem e obter resposta
    const response = await sendMessage(message);
    
    // Remover indicador de digitação
    removeTypingIndicator();
    
    // Adicionar resposta do bot
    addMessage(response, false);
    
    // Reabilitar input
    messageInput.disabled = false;
    messageInput.focus();
});

// Permitir enviar com Enter
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});

// Focar no input ao carregar a página
window.addEventListener('load', () => {
    messageInput.focus();
});
