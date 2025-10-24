const express = require('express');
const router = express.Router();
const medicosControllers = require('../controllers/medicosControllers');  // Importar el controlador de médicos

// Definir las rutas CRUD para la tabla 'medicos'
router.get('/', medicosControllers.obtenerTodos);  // Obtener todos los médicos
router.get('/:id', medicosControllers.obtenerPorId);  // Obtener un médico por ID
router.post('/', medicosControllers.crear);  // Crear un nuevo médico
router.put('/:id', medicosControllers.actualizar);  // Actualizar los datos de un médico
router.delete('/:id', medicosControllers.eliminar);  // Eliminar un médico

module.exports = router;  // Exportar las rutas para ser utilizadas en app.js
