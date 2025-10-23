const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Duenos = sequelize.define('Duenos', {
  id_dueno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { tableName: 'duenos', timestamps: false });

module.exports = Duenos;
