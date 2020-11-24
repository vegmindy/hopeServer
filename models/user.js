const {DataTypes} = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING, 
        allowNull: false
    }
})

module.exports = User;