const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VehicleType = sequelize.define('VehicleType', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    wheels: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = VehicleType;
