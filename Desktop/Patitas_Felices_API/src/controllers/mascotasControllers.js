const pool = require('../config/database'); // Importa la conexión a la base de datos

const mascotasController = {
  // Obtener todas las mascotas
  obtenerTodos: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM mascotas');
      res.status(200).json(rows);  // Responde con todas las mascotas
    } catch (error) {
      console.error('Error al obtener mascotas:', error);
      res.status(500).json({ message: 'Error al obtener las mascotas', error: error.message });
    }
  },

  // Obtener una mascota por su ID
  obtenerPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM mascotas WHERE id_mascota = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Mascota no encontrada' });
      }
      res.status(200).json(rows[0]);  // Responde con los datos de la mascota
    } catch (error) {
      console.error('Error al obtener la mascota:', error);
      res.status(500).json({ message: 'Error al obtener la mascota', error: error.message });
    }
  },

  // Crear una nueva mascota
  crear: async (req, res) => {
    const { nombre, especie, raza, edad, id_dueno } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO mascotas (nombre, especie, raza, edad, id_dueno) VALUES (?, ?, ?, ?, ?)',
        [nombre, especie, raza, edad, id_dueno]
      );
      const nuevaMascota = { id_mascota: result.insertId, nombre, especie, raza, edad, id_dueno };
      res.status(201).json(nuevaMascota);  // Responde con la nueva mascota creada
    } catch (error) {
      console.error('Error al crear la mascota:', error);
      res.status(500).json({ message: 'Error al crear la mascota', error: error.message });
    }
  },

  // Actualizar los datos de una mascota existente
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
      res.status(200).json(mascotaActualizada);  // Responde con la mascota actualizada
    } catch (error) {
      console.error('Error al actualizar la mascota:', error);
      res.status(500).json({ message: 'Error al actualizar la mascota', error: error.message });
    }
  },

  // Eliminar una mascota
  eliminar: async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query('DELETE FROM mascotas WHERE id_mascota = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Mascota no encontrada' });
      }
      res.status(200).json({ message: 'Mascota eliminada con éxito' });  // Responde con mensaje de eliminación exitosa
    } catch (error) {
      console.error('Error al eliminar la mascota:', error);
      res.status(500).json({ message: 'Error al eliminar la mascota', error: error.message });
    }
  }
};

module.exports = mascotasController;
