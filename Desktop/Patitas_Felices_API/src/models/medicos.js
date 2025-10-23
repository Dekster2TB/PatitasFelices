const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Medicos = sequelize.define('Medicos', {
  id_medico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { tableName: 'medicos', timestamps: false });

module.exports = Medicos;
