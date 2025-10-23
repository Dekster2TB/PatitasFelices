const pool = require('../config/database');

const fichasController = {
  obtenerTodas: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM fichas');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener fichas:', error);
      res.status(500).json({ message: 'Error al obtener las fichas', error: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM fichas WHERE id_ficha = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Ficha no encontrada' });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error al obtener la ficha:', error);
      res.status(500).json({ message: 'Error al obtener la ficha', error: error.message });
    }
  },

  crear: async (req, res) => {
    const { id_mascota, fecha, descripcion } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO fichas (id_mascota, fecha, descripcion) VALUES (?, ?, ?)',
        [id_mascota, fecha, descripcion]
      );
      const nuevaFicha = { id_ficha: result.insertId, id_mascota, fecha, descripcion };
      res.status(201).json(nuevaFicha);
    } catch (error) {
      console.error('Error al crear la ficha:', error);
      res.status(500).json({ message: 'Error al crear la ficha', error: error.message });
    }
  },

  actualizar: async (req, res) => {
    const { id } = req.params;
    const { id_mascota, fecha, descripcion } = req.body;
    try {
      const [result] = await pool.query(
        'UPDATE fichas SET id_mascota = ?, fecha = ?, descripcion = ? WHERE id_ficha = ?',
        [id_mascota, fecha, descripcion, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Ficha no encontrada' });
      }
      const fichaActualizada = { id_ficha: id, id_mascota, fecha, descripcion };
      res.status(200).json(fichaActualizada);
    } catch (error) {
      console.error('Error al actualizar la ficha:', error);
      res.status(500).json({ message: 'Error al actualizar la ficha', error: error.message });
    }
  },

  eliminar: async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM fichas WHERE id_ficha = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Ficha no encontrada' });
      }
      res.status(200).json({ message: 'Ficha eliminada con éxito' });
    } catch (error) {
      console.error('Error al eliminar la ficha:', error);
      res.status(500).json({ message: 'Error al eliminar la ficha', error: error.message });
    }
  }
};

module.exports = fichasController;
