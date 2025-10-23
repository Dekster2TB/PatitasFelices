const express = require('express');
const router = express.Router();
const fichasController = require('../controllers/fichasController');  // Importar el controlador de fichas

// Definir las rutas CRUD para la tabla 'fichas'
router.get('/', fichasController.obtenerTodas);  // Obtener todas las fichas
router.get('/:id', fichasController.obtenerPorId);  // Obtener una ficha por ID
router.post('/', fichasController.crear);  // Crear una nueva ficha
router.put('/:id', fichasController.actualizar);  // Actualizar los datos de una ficha
router.delete('/:id', fichasController.eliminar);  // Eliminar una ficha

module.exports = router;  // Exportar las rutas para ser utilizadas en app.js
