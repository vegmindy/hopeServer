const {DataTypes} = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
    gameTitle:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userReview:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userRating:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    owner_ID:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Review;