const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Base de datos en memoria (simulada)
let threads = [
    {
        id: 1,
        title: 'Hilo de prueba',
        messages: [
            { id: 1, text: 'Hola, ¿alguien aquí?', timestamp: Date.now() },
            { id: 2, text: 'Sí, yo estoy aquí.', timestamp: Date.now() }
        ]
    }
];

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener los hilos
app.get('/api/threads', (req, res) => {
    res.json(threads);
});

// Ruta para agregar un nuevo mensaje a un hilo
app.post('/api/threads/:id/messages', (req, res) => {
    const threadId = parseInt(req.params.id);
    const { text } = req.body;

    // Buscar el hilo
    const thread = threads.find(t => t.id === threadId);
    if (!thread) {
        return res.status(404).json({ message: 'Hilo no encontrado' });
    }

    // Agregar el nuevo mensaje
    const newMessage = {
        id: thread.messages.length + 1,
        text: text,
        timestamp: Date.now()
    };
    thread.messages.push(newMessage);

    res.status(201).json(newMessage);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
