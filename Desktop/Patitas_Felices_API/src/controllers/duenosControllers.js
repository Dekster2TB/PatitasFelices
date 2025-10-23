const pool = require('../config/database'); // Importa la conexión a la base de datos

const duenosController = {
  // Obtener todos los dueños
  obtenerTodos: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM duenos');
      res.status(200).json(rows);  // Responde con todos los dueños
    } catch (error) {
      console.error('Error al obtener los dueños:', error);
      res.status(500).json({ message: 'Error al obtener los dueños', error: error.message });
    }
  },

  // Obtener un dueño por su ID
  obtenerPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM duenos WHERE id_dueno = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Dueño no encontrado' });
      }
      res.status(200).json(rows[0]);  // Responde con los datos del dueño
    } catch (error) {
      console.error('Error al obtener el dueño:', error);
      res.status(500).json({ message: 'Error al obtener el dueño', error: error.message });
    }
  },

  // Crear un nuevo dueño
  crear: async (req, res) => {
    const { nombre, telefono, direccion } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO duenos (nombre, telefono, direccion) VALUES (?, ?, ?)',
        [nombre, telefono, direccion]
      );
      const nuevoDuenos = { id_dueno: result.insertId, nombre, telefono, direccion };
      res.status(201).json(nuevoDuenos);  // Responde con el nuevo dueño creado
    } catch (error) {
      console.error('Error al crear el dueño:', error);
      res.status(500).json({ message: 'Error al crear el dueño', error: error.message });
    }
  },

  // Actualizar los datos de un dueño
  actualizar: async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, direccion } = req.body;
    try {
      const [result] = await pool.query(
        'UPDATE duenos SET nombre = ?, telefono = ?, direccion = ? WHERE id_dueno = ?',
        [nombre, telefono, direccion, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Dueño no encontrado' });
      }
      const dueñoActualizado = { id_dueno: id, nombre, telefono, direccion };
      res.status(200).json(dueñoActualizado);  // Responde con el dueño actualizado
    } catch (error) {
      console.error('Error al actualizar el dueño:', error);
      res.status(500).json({ message: 'Error al actualizar el dueño', error: error.message });
    }
  },

  // Eliminar un dueño
  eliminar: async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM duenos WHERE id_dueno = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Dueño no encontrado' });
      }
      res.status(200).json({ message: 'Dueño eliminado con éxito' });  // Responde con mensaje de eliminación exitosa
    } catch (error) {
      console.error('Error al eliminar el dueño:', error);
      res.status(500).json({ message: 'Error al eliminar el dueño', error: error.message });
    }
  }
};

module.exports = duenosController;
