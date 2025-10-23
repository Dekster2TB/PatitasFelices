require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: process.env.DB_SSL === 'true' ? {} : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ ¡API de Veterinaria funcionando correctamente!');
});

app.get('/ping-db', async (req, res) => {
  try {
    const [r] = await pool.query('SELECT 1 AS ok');
    res.json(r);
  } catch (err) {
    console.error('Error DB (ping):', err);
    res.status(500).send('❌ No me pude conectar a MySQL');
  }
});

const mascotasRoutes = require('./src/routes/mascotasRoutes');
app.use('/api/mascotas', mascotasRoutes);

const duenosRoutes = require('./src/routes/duenosRoutes');
app.use('/api/duenos', duenosRoutes);

const citasRoutes = require('./src/routes/citasRoutes');
app.use('/api/citas', citasRoutes);

const medicosRoutes = require('./src/routes/medicosRoutes');
app.use('/api/medicos', medicosRoutes);

const tratamientosRoutes = require('./src/routes/tratamientosRoutes');
app.use('/api/tratamientos', tratamientosRoutes);

const fichasRoutes = require('./src/routes/fichasRoutes');
app.use('/api/fichas', fichasRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor API escuchando en http://localhost:${PORT}`);
});
