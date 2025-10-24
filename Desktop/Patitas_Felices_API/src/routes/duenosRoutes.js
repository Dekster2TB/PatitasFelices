const express = require('express');
const router = express.Router();
const duenosControllers = require('../controllers/duenosControllers');  // Importar el controlador de dueños

// Definir las rutas CRUD para la tabla 'duenos'
router.get('/', duenosControllers.obtenerTodos);  // Obtener todos los dueños
router.get('/:id', duenosControllers.obtenerPorId);  // Obtener un dueño por ID
router.post('/', duenosControllers.crear);  // Crear un nuevo dueño
router.put('/:id', duenosControllers.actualizar);  // Actualizar los datos de un dueño
router.delete('/:id', duenosControllers.eliminar);  // Eliminar un dueño

module.exports = router;  // Exportar las rutas para ser utilizadas en app.js
