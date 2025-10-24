// Importar la configuración de la base de datos
const pool = require('./database');

// Exportar la configuración de la base de datos y otras configuraciones
module.exports = {
  pool,  // Aquí estamos exportando el pool de conexiones para usarlo en otras partes de la aplicación
  // Puedes agregar otras configuraciones si las necesitas más adelante
};
