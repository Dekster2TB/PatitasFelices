const express = require('express');
const router = express.Router();
const citasControllers = require('../controllers/citasControllers');  // Importar el controlador de citas

// Definir las rutas CRUD para la tabla 'citas'
router.get('/', citasControllers.obtenerTodas);  // Obtener todas las citas
router.get('/:id', citasControllers.obtenerPorId);  // Obtener una cita por ID
router.post('/', citasControllers.crear);  // Crear una nueva cita
router.put('/:id', citasControllers.actualizar);  // Actualizar los datos de una cita
router.delete('/:id', citasControllers.eliminar);  // Eliminar una cita

module.exports = router;  // Exportar las rutas para ser utilizadas en app.js
