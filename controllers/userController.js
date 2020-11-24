const router = require('express').Router();
const {User} = require('../models');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UniqueConstraintError } = require('sequelize/lib/errors');


//sign up info goes here from josh







router.post('/login', async (req, res) => {
    let {email, password} = req.body;
    try {
        let loginUser = await User.findOne({
            where: {email}
        })
        if(loginUser && await bcrypt.compare(password, loginUser.password)) {
            const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
            res.status(200).json({
                message: "Successful Login",
                user: loginUser,
                token
            })
        } else {
            res.status(401).json({
                error: "Failed to login"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "Error logging in"
        })
    }
})

module.exports = router;