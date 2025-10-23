const express = require('express');
const router = express.Router();
const duenosController = require('../controllers/duenosController');  // Importar el controlador de dueños

// Definir las rutas CRUD para la tabla 'duenos'
router.get('/', duenosController.obtenerTodos);  // Obtener todos los dueños
router.get('/:id', duenosController.obtenerPorId);  // Obtener un dueño por ID
router.post('/', duenosController.crear);  // Crear un nuevo dueño
router.put('/:id', duenosController.actualizar);  // Actualizar los datos de un dueño
router.delete('/:id', duenosController.eliminar);  // Eliminar un dueño

module.exports = router;  // Exportar las rutas para ser utilizadas en app.js
