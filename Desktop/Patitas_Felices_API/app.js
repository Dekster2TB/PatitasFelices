require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env
const express = require('express');
const cors = require('cors');

// Importar las rutas de las diferentes tablas
const mascotasRoutes = require('./routes/mascotasRoutes');
const duenosRoutes = require('./routes/duenosRoutes');
const citasRoutes = require('./routes/citasRoutes');
const medicosRoutes = require('./routes/medicosRoutes');
const tratamientosRoutes = require('./routes/tratamientosRoutes');
const fichasRoutes = require('./routes/fichasRoutes');

// Crear una nueva instancia de Express
const app = express();

// Configurar el puerto de la aplicación (Render lo proporcionará a través de process.env.PORT)
const PORT = process.env.PORT || 10000;  // Usar el puerto proporcionado por Render o 10000 por defecto

// Middleware para habilitar CORS y manejar solicitudes JSON
app.use(cors());
app.use(express.json());

// Usar las rutas importadas
app.use('/api/mascotas', mascotasRoutes);        // Rutas para las mascotas
app.use('/api/duenos', duenosRoutes);            // Rutas para los dueños
app.use('/api/citas', citasRoutes);              // Rutas para las citas
app.use('/api/medicos', medicosRoutes);          // Rutas para los médicos
app.use('/api/tratamientos', tratamientosRoutes); // Rutas para los tratamientos
app.use('/api/fichas', fichasRoutes);            // Rutas para las fichas

// Ruta de prueba para comprobar que la API está funcionando correctamente
app.get('/', (req, res) => {
  res.send('✅ ¡API de Veterinaria funcionando correctamente!');
});

// Ruta para probar la conexión a la base de datos
app.get('/ping-db', async (req, res) => {
  try {
    const [r] = await pool.query('SELECT 1 AS ok');  // Realizar una consulta simple
    res.json(r);  // Responder con el resultado de la consulta
  } catch (err) {
    console.error('Error DB (ping):', err);
    res.status(500).send('No me pude conectar a MySQL');
  }
});

// Iniciar el servidor en el puerto configurado
app.listen(PORT, () => {
  console.log(`🚀 Servidor API escuchando en http://localhost:${PORT}`);
});
