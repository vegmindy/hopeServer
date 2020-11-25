const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/favorite');
const validateSession = require('../middleware/validateSession');

router.delete("/delete/:id", validateSession, (req, res) => {
    let ownerid = req.user.id;
    
    Review.findAll({where: {owner_ID: ownerid}})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router;