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
    userName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_ID:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalUserRating:{
        type: DataTypes.INTEGER,
        allowNull: true
    }

})

module.exports = Review;

//Review, OwnerID, UserRating, Overall Rating