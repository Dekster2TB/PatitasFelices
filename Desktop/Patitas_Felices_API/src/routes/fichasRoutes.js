const express = require('express');
const router = express.Router();
const fichasControllers = require('../controllers/fichasControllers');  // Importar el controlador de fichas

// Definir las rutas CRUD para la tabla 'fichas'
router.get('/', fichasControllers.obtenerTodas);  // Obtener todas las fichas
router.get('/:id', fichasControllers.obtenerPorId);  // Obtener una ficha por ID
router.post('/', fichasControllers.crear);  // Crear una nueva ficha
router.put('/:id', fichasControllers.actualizar);  // Actualizar los datos de una ficha
router.delete('/:id', fichasControllers.eliminar);  // Eliminar una ficha

module.exports = router;  // Exportar las rutas para ser utilizadas en app.js
