const express = require('express');
const router = express.Router();
const medicosController = require('../controllers/medicosController');  // Importar el controlador de médicos

// Definir las rutas CRUD para la tabla 'medicos'
router.get('/', medicosController.obtenerTodos);  // Obtener todos los médicos
router.get('/:id', medicosController.obtenerPorId);  // Obtener un médico por ID
router.post('/', medicosController.crear);  // Crear un nuevo médico
router.put('/:id', medicosController.actualizar);  // Actualizar los datos de un médico
router.delete('/:id', medicosController.eliminar);  // Eliminar un médico

module.exports = router;  // Exportar las rutas para ser utilizadas en app.js
