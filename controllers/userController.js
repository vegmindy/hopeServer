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
            preferences
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

module.exports = router;