const UserModel = require('../models/user.model')
const express = require('express')
const router = express.Router()

const users = require('../controllers/user.controller')

router.post('/user', users.create)
        .post('/login', users.login)

module.exports = router