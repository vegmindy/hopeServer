const express = require('express');
const router = express.Router();
const{Review} = require('../models/index');
const validateSession = require('../middleware/validateSession');

router.get("/byuser", (req, res) => {
    let ownerid = req.body.owner_ID
    Review.findAll({where: {owner_ID: ownerid}})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
})

router.get("/:id", (req, res) => {
    Review.findOne({Where:{id: req.params.id}})
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json(err))
})

router.post("/addreview", async (req, res) => {
    const {gameTitle, userReview, userRating, userName} = req.body;//totalUserRating

    try{

        let newReview = await Review.create({
            gameTitle,
            userReview,
            userRating,
            userName,
            owner_ID: req.user.id
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

router.put('/updatereview:id', (req, res) => {
    const query = req.params.id;
    Review.update(req.body, {where: {id: query}})
    .then(reviewUpdated => {
        Review.findOne({where: {id: query}})
        .then(locatedUpdatedReview => {
            res.status(200).json({
                review: locatedUpdatedReview,
                message: 'Review has been updated',
                reviewChanged: reviewUpdated
            })
        })
    })
})





module.exports = router;