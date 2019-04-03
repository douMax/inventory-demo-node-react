const express = require('express')

const router = express.Router()


router.get('/person', (req, res) => {
    res.send('a person hahaha')
})

moudule.exports = router