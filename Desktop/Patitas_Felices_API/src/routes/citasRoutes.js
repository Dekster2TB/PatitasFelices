const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');  // Importar el controlador de citas

// Definir las rutas CRUD para la tabla 'citas'
router.get('/', citasController.obtenerTodas);  // Obtener todas las citas
router.get('/:id', citasController.obtenerPorId);  // Obtener una cita por ID
router.post('/', citasController.crear);  // Crear una nueva cita
router.put('/:id', citasController.actualizar);  // Actualizar los datos de una cita
router.delete('/:id', citasController.eliminar);  // Eliminar una cita

module.exports = router;  // Exportar las rutas para ser utilizadas en app.js
