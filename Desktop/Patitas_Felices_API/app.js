require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 10000;

// Configurar conexión a la base de datos MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? {} : undefined, // activa SSL si DB_SSL=true
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// Middleware (por si luego agregas peticiones POST)
app.use(express.json());

// -------------------------
// RUTAS BÁSICAS
// -------------------------

// Ruta de prueba del servidor
app.get('/', (req, res) => {
  res.send('✅ ¡API de Veterinaria funcionando correctamente!');
});

// Ruta de diagnóstico: prueba conexión a MySQL
app.get('/ping-db', async (req, res) => {
  try {
    const [r] = await pool.query('SELECT 1 AS ok');
    res.json(r);
  } catch (err) {
    console.error('Error DB (ping):', err);
    res.status(500).send('No me pude conectar a MySQL');
  }
});

// -------------------------
// RUTAS DE LAS TABLAS
// -------------------------

// 1️⃣ Tabla MASCOTAS
app.get('/mascotas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM mascotas');
    res.json(rows);
  } catch (err) {
    console.error('Error DB /mascotas:', err);
    res.status(500).send('Error al obtener las mascotas');
  }
});

// 2️⃣ Tabla DUEÑOS
app.get('/duenos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM duenos');
    res.json(rows);
  } catch (err) {
    console.error('Error DB /duenos:', err);
    res.status(500).send('Error al obtener los dueños');
  }
});

// 3️⃣ Tabla MEDICOS
app.get('/medicos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM medicos');
    res.json(rows);
  } catch (err) {
    console.error('Error DB /medicos:', err);
    res.status(500).send('Error al obtener los médicos');
  }
});

// 4️⃣ Tabla CITAS
app.get('/citas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM citas');
    res.json(rows);
  } catch (err) {
    console.error('Error DB /citas:', err);
    res.status(500).send('Error al obtener las citas');
  }
});

// 5️⃣ Tabla FICHAS
app.get('/fichas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM fichas');
    res.json(rows);
  } catch (err) {
    console.error('Error DB /fichas:', err);
    res.status(500).send('Error al obtener las fichas');
  }
});

// 6️⃣ Tabla TRATAMIENTOS
app.get('/tratamientos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tratamientos');
    res.json(rows);
  } catch (err) {
    console.error('Error DB /tratamientos:', err);
    res.status(500).send('Error al obtener los tratamientos');
  }
});

// -------------------------
// INICIO DEL SERVIDOR
// -------------------------
app.listen(PORT, () => {
  console.log(`🚀 Servidor API escuchando en http://localhost:${PORT}`);
});
