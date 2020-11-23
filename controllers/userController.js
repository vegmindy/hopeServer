const router = require('express').Router();
const {Users} = require('../models');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { UniqueConstraintError } = require('sequelize/lib/errors');






module.exports = router;