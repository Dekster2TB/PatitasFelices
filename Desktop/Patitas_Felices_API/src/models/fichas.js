const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Fichas = sequelize.define('Fichas', {
  id_ficha: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  id_mascota: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { tableName: 'fichas', timestamps: false });

module.exports = Fichas;
