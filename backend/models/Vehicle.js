const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const VehicleType = require('./VehicleType');

const Vehicle = sequelize.define('Vehicle', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    typeId: { type: DataTypes.INTEGER, references: { model: VehicleType, key: 'id' } }
});

VehicleType.hasMany(Vehicle, { foreignKey: 'typeId' });
Vehicle.belongsTo(VehicleType, { foreignKey: 'typeId' });

module.exports = Vehicle;
