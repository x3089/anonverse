const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear datos JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a AnonymousVerse.');
});

// Aquí agregarás otras rutas más tarde...

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
