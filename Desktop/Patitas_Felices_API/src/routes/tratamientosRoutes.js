const express = require('express');
const router = express.Router();
const tratamientosControllers = require('../controllers/tratamientosControllers');  // Importar el controlador de tratamientos

// Definir las rutas CRUD para la tabla 'tratamientos'
router.get('/', tratamientosControllers.obtenerTodos);  // Obtener todos los tratamientos
router.get('/:id', tratamientosControllers.obtenerPorId);  // Obtener un tratamiento por ID
router.post('/', tratamientosControllers.crear);  // Crear un nuevo tratamiento
router.put('/:id', tratamientosControllers.actualizar);  // Actualizar los datos de un tratamiento
router.delete('/:id', tratamientosControllers.eliminar);  // Eliminar un tratamiento

module.exports = router;  // Exportar las rutas para ser utilizadas en app.js
