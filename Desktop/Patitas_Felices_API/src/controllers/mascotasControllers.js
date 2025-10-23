const pool = require('../config/database');

const mascotasController = {
  obtenerTodos: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM mascotas');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener mascotas:', error);
      res.status(500).json({ message: 'Error al obtener las mascotas', error: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM mascotas WHERE id_mascota = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Mascota no encontrada' });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error al obtener la mascota:', error);
      res.status(500).json({ message: 'Error al obtener la mascota', error: error.message });
    }
  },

  crear: async (req, res) => {
    const { nombre, especie, raza, edad, id_dueno } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO mascotas (nombre, especie, raza, edad, id_dueno) VALUES (?, ?, ?, ?, ?)',
        [nombre, especie, raza, edad, id_dueno]
      );
      const nuevaMascota = { id_mascota: result.insertId, nombre, especie, raza, edad, id_dueno };
      res.status(201).json(nuevaMascota);
    } catch (error) {
      console.error('Error al crear la mascota:', error);
      res.status(500).json({ message: 'Error al crear la mascota', error: error.message });
    }
  },

  actualizar: async (req, res) => {
    const { id } = req.params;
    const { nombre, especie, raza, edad, id_dueno } = req.body;
    try {
      const [result] = await pool.query(
        'UPDATE mascotas SET nombre = ?, especie = ?, raza = ?, edad = ?, id_dueno = ? WHERE id_mascota = ?',
        [nombre, especie, raza, edad, id_dueno, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Mascota no encontrada' });
      }
      const mascotaActualizada = { id_mascota: id, nombre, especie, raza, edad, id_dueno };
      res.status(200).json(mascotaActualizada);
    } catch (error) {
      console.error('Error al actualizar la mascota:', error);
      res.status(500).json({ message: 'Error al actualizar la mascota', error: error.message });
    }
  },

  eliminar: async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM mascotas WHERE id_mascota = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Mascota no encontrada' });
      }
      res.status(200).json({ message: 'Mascota eliminada con éxito' });
    } catch (error) {
      console.error('Error al eliminar la mascota:', error);
      res.status(500).json({ message: 'Error al eliminar la mascota', error: error.message });
    }
  }
};

module.exports = mascotasController;
