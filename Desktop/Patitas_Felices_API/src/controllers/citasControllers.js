const pool = require('../config/database'); // Importa la conexión a la base de datos

const citasController = {
  obtenerTodas: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM citas');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener citas:', error);
      res.status(500).json({ message: 'Error al obtener las citas', error: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM citas WHERE id_cita = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Cita no encontrada' });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error al obtener la cita:', error);
      res.status(500).json({ message: 'Error al obtener la cita', error: error.message });
    }
  },

  crear: async (req, res) => {
    const { fecha, hora, id_mascota, id_medico, motivo } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO citas (fecha, hora, id_mascota, id_medico, motivo) VALUES (?, ?, ?, ?, ?)',
        [fecha, hora, id_mascota, id_medico, motivo]
      );
      const nuevaCita = { id_cita: result.insertId, fecha, hora, id_mascota, id_medico, motivo };
      res.status(201).json(nuevaCita);
    } catch (error) {
      console.error('Error al crear la cita:', error);
      res.status(500).json({ message: 'Error al crear la cita', error: error.message });
    }
  },

  actualizar: async (req, res) => {
    const { id } = req.params;
    const { fecha, hora, id_mascota, id_medico, motivo } = req.body;
    try {
      const [result] = await pool.query(
        'UPDATE citas SET fecha = ?, hora = ?, id_mascota = ?, id_medico = ?, motivo = ? WHERE id_cita = ?',
        [fecha, hora, id_mascota, id_medico, motivo, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Cita no encontrada' });
      }
      const citaActualizada = { id_cita: id, fecha, hora, id_mascota, id_medico, motivo };
      res.status(200).json(citaActualizada);
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
      res.status(500).json({ message: 'Error al actualizar la cita', error: error.message });
    }
  },

  eliminar: async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM citas WHERE id_cita = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Cita no encontrada' });
      }
      res.status(200).json({ message: 'Cita eliminada con éxito' });
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      res.status(500).json({ message: 'Error al eliminar la cita', error: error.message });
    }
  }
};

module.exports = citasController;
