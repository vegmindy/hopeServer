const {DataTypes} = require("sequelize");
const db = require("../db");

const Favorite = db.define("favorites", {
    name:{ //name of game
        type: DataTypes.STRING,
        allowNull: false
    },
    owner_id:{ //user that favorited the item
        type: DataTypes.NUMBER,
        allowNull: false
    }
});

module.exports = Favorite;

//Review, OwnerID, UserRating, Overall Rating