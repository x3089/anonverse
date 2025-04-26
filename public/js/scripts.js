console.log('¡Anonverse está listo!');
document.addEventListener('DOMContentLoaded', function () {
    const threadsContainer = document.getElementById('threads-container');
    const messageInput = document.getElementById('message-input');
    const sendMessageBtn = document.getElementById('send-message-btn');

    // Cargar los hilos
    async function loadThreads() {
        const response = await fetch('/api/threads');
        const threads = await response.json();

        threadsContainer.innerHTML = ''; // Limpiar el contenedor

        threads.forEach(thread => {
            const threadElement = document.createElement('div');
            threadElement.classList.add('thread');
            threadElement.innerHTML = `
                <h3>${thread.title}</h3>
                <div class="messages">
                    ${thread.messages.map(message => `<p><strong>${new Date(message.timestamp).toLocaleString()}</strong>: ${message.text}</p>`).join('')}
                </div>
                <textarea class="message-input" data-thread-id="${thread.id}" placeholder="Escribe un mensaje..."></textarea>
                <button class="send-message-btn" data-thread-id="${thread.id}">Enviar</button>
            `;
            threadsContainer.appendChild(threadElement);
        });
    }

    // Enviar mensaje
    async function sendMessage(threadId, messageText) {
        const response = await fetch(`/api/threads/${threadId}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: messageText })
        });

        if (response.ok) {
            loadThreads(); // Recargar hilos para mostrar el nuevo mensaje
        } else {
            alert('Error al enviar el mensaje');
        }
    }

    // Evento para enviar un mensaje al hilo correspondiente
    threadsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('send-message-btn')) {
            const threadId = parseInt(event.target.dataset.threadId);
            const messageText = event.target.previousElementSibling.value;
            if (messageText.trim()) {
                sendMessage(threadId, messageText);
            }
        }
    });

    loadThreads();
});
