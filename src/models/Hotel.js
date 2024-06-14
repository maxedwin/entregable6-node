const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Hotel = sequelize.define('hotel', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lon: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // cityID
});

module.exports = Hotel;