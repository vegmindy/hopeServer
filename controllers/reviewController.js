const express = require('express');
const router = express.Router();
const{Review} = require('../models/index');
const validateSession = require('../middleware/validateSession');
const { findOne } = require('../models/user');

router.get("/byuser", (req, res) => {
    let ownerid = req.body.owner_ID
    Review.findAll({where: {owner_ID: ownerid}})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
})

router.get("/bygame", (req, res) => {
    let gameId = req.body.gameId
    Review.findAll({where: {gameId: gameId}})
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => res.status(500).json({error: err}))
})


router.get("/all", (req, res) =>{
    Review.findAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
})

router.get("/:id", (req, res) => {
    Review.findOne({where:{id: req.params.id}})
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json(err))
})

router.post("/addreview", async (req, res) => {
    const { gameId, userReview, userRating } = req.body; //totalUserRating

    try{

        let newReview = await Review.create({
            gameId,
            userReview,
            userRating,
            owner_ID: req.user.id
        });
        
        res.status(200).json({
            review: newReview,
            message: "Review submitted"
        })
    }
    catch(error) {
        res.status(500).json({message:"Server Error" + error})
    }
});

//* DELETE REVIEW

router.delete('/:id', (req, res) => {
    Review.destroy({
        where: { id: req.params.id}
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.json({error: err}))
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



// router.delete('/deleteReview', (req, res) => {
//     let content=findOne({where: {id: req.body.id}})
    // let query = {
    //     where: {
    //         review: deleteReview,
    //         message: "Review successfully deleted"
    //     }
    // }

//     Review.destroy(content)
//       .then(() => res.status(200).json({ message: "Journal Entry Removed" }))
//       .catch((err) => res.status(500).json({ error:err }));
// });

module.exports = router;