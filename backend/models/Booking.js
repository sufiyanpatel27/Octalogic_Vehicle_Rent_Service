const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const Vehicle = require('./Vehicle');

const Booking = sequelize.define('Booking', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userName: { type: DataTypes.STRING, allowNull: false },
    vehicleId: { type: DataTypes.INTEGER, references: { model: Vehicle, key: 'id' } },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false }
});

module.exports = Booking;
