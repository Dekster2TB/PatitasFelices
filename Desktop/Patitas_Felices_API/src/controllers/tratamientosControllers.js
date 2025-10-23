const pool = require('../config/database');

const tratamientosController = {
  obtenerTodos: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM tratamientos');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener tratamientos:', error);
      res.status(500).json({ message: 'Error al obtener los tratamientos', error: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM tratamientos WHERE id_tratamiento = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Tratamiento no encontrado' });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error al obtener el tratamiento:', error);
      res.status(500).json({ message: 'Error al obtener el tratamiento', error: error.message });
    }
  },

  crear: async (req, res) => {
    const { nombre, descripcion, costo } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO tratamientos (nombre, descripcion, costo) VALUES (?, ?, ?)',
        [nombre, descripcion, costo]
      );
      const nuevoTratamiento = { id_tratamiento: result.insertId, nombre, descripcion, costo };
      res.status(201).json(nuevoTratamiento);
    } catch (error) {
      console.error('Error al crear el tratamiento:', error);
      res.status(500).json({ message: 'Error al crear el tratamiento', error: error.message });
    }
  },

  actualizar: async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, costo } = req.body;
    try {
      const [result] = await pool.query(
        'UPDATE tratamientos SET nombre = ?, descripcion = ?, costo = ? WHERE id_tratamiento = ?',
        [nombre, descripcion, costo, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Tratamiento no encontrado' });
      }
      const tratamientoActualizado = { id_tratamiento: id, nombre, descripcion, costo };
      res.status(200).json(tratamientoActualizado);
    } catch (error) {
      console.error('Error al actualizar el tratamiento:', error);
      res.status(500).json({ message: 'Error al actualizar el tratamiento', error: error.message });
    }
  },

  eliminar: async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM tratamientos WHERE id_tratamiento = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Tratamiento no encontrado' });
      }
      res.status(200).json({ message: 'Tratamiento eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el tratamiento:', error);
      res.status(500).json({ message: 'Error al eliminar el tratamiento', error: error.message });
    }
  }
};

module.exports = tratamientosController;
