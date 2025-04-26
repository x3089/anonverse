const express = require('express');
const router = express.Router();

// Aquí puedes agregar las rutas para manejar los hilos (posts)

// Ejemplo de ruta para obtener todos los hilos
router.get('/', (req, res) => {
  res.json({ message: 'Aquí estarán los hilos.' });
});

module.exports = router;
