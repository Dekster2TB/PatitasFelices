const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Citas = sequelize.define('Citas', {
  id_cita: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  id_mascota: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_medico: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { tableName: 'citas', timestamps: false });

module.exports = Citas;
