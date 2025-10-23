const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tratamientos = sequelize.define('Tratamientos', {
  id_tratamiento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  costo: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, { tableName: 'tratamientos', timestamps: false });

module.exports = Tratamientos;
