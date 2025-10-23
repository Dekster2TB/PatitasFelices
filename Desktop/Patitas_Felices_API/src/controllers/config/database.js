const mysql = require('mysql2/promise');  // Usamos mysql2/promise para trabajar con async/await

// Crear la conexión a la base de datos usando las variables de entorno
const pool = mysql.createPool({
  host: process.env.DB_HOST,        // Dirección de la base de datos, configurada en .env
  user: process.env.DB_USER,        // Usuario de la base de datos
  password: process.env.DB_PASS,    // Contraseña de la base de datos
  database: process.env.DB_NAME,    // Nombre de la base de datos
  port: process.env.DB_PORT || 3306, // Puerto por defecto es 3306, si no está en .env
  ssl: process.env.DB_SSL === 'true' ? {} : undefined,  // Configuración de SSL si es necesario
  waitForConnections: true,
  connectionLimit: 10,  // Límite de conexiones
  queueLimit: 0         // No hay límite de cola
});

// Exportamos el pool de conexiones para usarlo en otros archivos
module.exports = pool;
