const router = require('express').Router();
const {User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UniqueConstraintError } = require('sequelize/lib/errors');


//* REGISTER USER
router.post('/register', async (req, res) => {
    let {firstName, lastName, email, password, preferences} = req.body;

    try {
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 13),
            preferences: ( preferences ) ? preferences : "None"
        })
        res.status(201).json({
            message: "User Registered!",
            user: newUser
        })
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use."
            })
        } else {
            res.status(500).json({
                error: "Failed to register user."
            })
        }
    }
});


router.post('/login', async (req, res) => {
    console.log(1)
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
});

router.get('/getUser', (req, res) => {
    User.findOne({where:{id:req.body.id}})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
}) 

module.exports = router;