require('dotenv').config();  
const express = require('express');
const cors = require('cors');


const mascotasRoutes = require('./routes/mascotasRoutes');
const duenosRoutes = require('./routes/duenosRoutes');
const citasRoutes = require('./routes/citasRoutes');
const medicosRoutes = require('./routes/medicosRoutes');
const tratamientosRoutes = require('./routes/tratamientosRoutes');
const fichasRoutes = require('./routes/fichasRoutes');


const app = express();


const PORT = process.env.PORT || 10000;  


app.use(cors());
app.use(express.json());

// Usar las rutas importadas
app.use('/api/mascotas', mascotasRoutes);        
app.use('/api/duenos', duenosRoutes);            
app.use('/api/citas', citasRoutes);              
app.use('/api/medicos', medicosRoutes);          
app.use('/api/tratamientos', tratamientosRoutes); 
app.use('/api/fichas', fichasRoutes);            


app.get('/', (req, res) => {
  res.send('✅ ¡API de Veterinaria funcionando correctamente!');
});


app.get('/ping-db', async (req, res) => {
  try {
    const [r] = await pool.query('SELECT 1 AS ok');  
    res.json(r);  
  } catch (err) {
    console.error('Error DB (ping):', err);
    res.status(500).send('No me pude conectar a MySQL');
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor API escuchando en http://localhost:${PORT}`);
});
