const express = require('express');
const router = express.Router();
const{Review} = require('../models');
const validateSession = require('../middleware/validateSession');




router.post("/addreview", async (req, res) => {
    const {gameTitle, userReview, userRating, userName, owner_ID} = req.body;//totalUserRating
    try{
        
        let newReview = Review.create({
            gameTitle,
            userReview,
            userRating,
            userName,
            owner_ID
        });
        
        res.status(200).json({
            review: newReview,
            message: "Review submitted"
        })
    }
    catch{
        res.status(500).json({message:"Server Error"})
    }
})




module.exports = router;