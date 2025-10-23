const express = require('express');
const router = express.Router();
const tratamientosController = require('../controllers/tratamientosController');  // Importar el controlador de tratamientos

// Definir las rutas CRUD para la tabla 'tratamientos'
router.get('/', tratamientosController.obtenerTodos);  // Obtener todos los tratamientos
router.get('/:id', tratamientosController.obtenerPorId);  // Obtener un tratamiento por ID
router.post('/', tratamientosController.crear);  // Crear un nuevo tratamiento
router.put('/:id', tratamientosController.actualizar);  // Actualizar los datos de un tratamiento
router.delete('/:id', tratamientosController.eliminar);  // Eliminar un tratamiento

module.exports = router;  // Exportar las rutas para ser utilizadas en app.js
