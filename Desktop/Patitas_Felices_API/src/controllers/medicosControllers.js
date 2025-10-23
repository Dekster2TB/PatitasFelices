const pool = require('../config/database');

const medicosController = {
  obtenerTodos: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM medicos');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener médicos:', error);
      res.status(500).json({ message: 'Error al obtener los médicos', error: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM medicos WHERE id_medico = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Médico no encontrado' });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error al obtener el médico:', error);
      res.status(500).json({ message: 'Error al obtener el médico', error: error.message });
    }
  },

  crear: async (req, res) => {
    const { nombre, especialidad, telefono } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO medicos (nombre, especialidad, telefono) VALUES (?, ?, ?)',
        [nombre, especialidad, telefono]
      );
      const nuevoMedico = { id_medico: result.insertId, nombre, especialidad, telefono };
      res.status(201).json(nuevoMedico);
    } catch (error) {
      console.error('Error al crear el médico:', error);
      res.status(500).json({ message: 'Error al crear el médico', error: error.message });
    }
  },

  actualizar: async (req, res) => {
    const { id } = req.params;
    const { nombre, especialidad, telefono } = req.body;
    try {
      const [result] = await pool.query(
        'UPDATE medicos SET nombre = ?, especialidad = ?, telefono = ? WHERE id_medico = ?',
        [nombre, especialidad, telefono, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Médico no encontrado' });
      }
      const medicoActualizado = { id_medico: id, nombre, especialidad, telefono };
      res.status(200).json(medicoActualizado);
    } catch (error) {
      console.error('Error al actualizar el médico:', error);
      res.status(500).json({ message: 'Error al actualizar el médico', error: error.message });
    }
  },

  eliminar: async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM medicos WHERE id_medico = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Médico no encontrado' });
      }
      res.status(200).json({ message: 'Médico eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el médico:', error);
      res.status(500).json({ message: 'Error al eliminar el médico', error: error.message });
    }
  }
};

module.exports = medicosController;
