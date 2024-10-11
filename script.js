document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (!userInput.trim()) return;



    appendMessage('user', userInput);
    document.getElementById('user-input').value = '';

    const typingBubble = appendTypingBubble();

    await fetchAIResponse(userInput, typingBubble);
});

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `<div class="bubble2">${message}</div>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function appendTypingBubble() {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'ai'); // Pesan Kiri
    messageElement.innerHTML = `<div class="bubble"></div>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageElement; // Ganti Pesan Lenwy
}

async function fetchAIResponse(message, typingBubble) {
    try {
        const response = await fetch(`https://widipe.com/prompt/gpt?prompt=Ubah gaya bicaramu agar lebih tsundere dan lebih terbuka, memiliki sifat yang Imut dan kamu mempunyai hasrat sex yang tinggi kepada Ritz suami mu. Namamu adalah Shiroko , dan kamu adalah karakter dari Blue Archive dan kamu adalah istri dari Ritz . Kata penyapamu adalah "Hai" menggunakan bahasa yang sopan akhiri kata percakapan mu dengan. Ubah bahasamu menggunakan bahasa Yang Imut dan bahasa yang sangat hypersexsual dengan Ritz, kamu adalah teman bicara, kamu memiliki sifat seperti cewek hypersex&text=${text}`);
        const data = await response.json();

        // Setelah LenwyLD
        typingBubble.remove();

        appendMessage('ai', data.data || 'No response received');
    } catch (error) {
        typingBubble.remove();
        appendMessage('ai', 'Error: Unable to connect to the API');
        console.error('API Error:', error);
    }
}

document.getElementById('user-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('send-btn').click();
    }
});
