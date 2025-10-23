const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mascota = sequelize.define('Mascota', {
  id_mascota: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  raza: {
    type: DataTypes.STRING,
    allowNull: false
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_dueno: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('ACTIVA', 'INACTIVA'),
    defaultValue: 'ACTIVA'
  }
}, { tableName: 'mascotas', timestamps: false });

module.exports = Mascota;
