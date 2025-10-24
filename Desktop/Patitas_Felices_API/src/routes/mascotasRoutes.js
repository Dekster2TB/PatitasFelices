const express = require('express');
const router = express.Router();
const mascotasController = require('../src/controllers/mascotasController');  // Importar el controlador de mascotas

// Definir las rutas CRUD para la tabla 'mascotas'
router.get('/', mascotasController.obtenerTodos);  // Obtener todas las mascotas
router.get('/:id', mascotasController.obtenerPorId);  // Obtener una mascota por ID
router.post('/', mascotasController.crear);  // Crear una nueva mascota
router.put('/:id', mascotasController.actualizar);  // Actualizar los datos de una mascota
router.delete('/:id', mascotasController.eliminar);  // Eliminar una mascota

module.exports = router;  // Exportar las rutas para ser utilizadas en app.js
