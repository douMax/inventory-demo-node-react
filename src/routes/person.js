const express = require('express')

const router = express.Router()


router.get('/person', (req, res) => {
    res.send('a person hahaha')
})

router.get('/person/:name', (req, res) => {
    res.send(`person name is ${req.params.name}`)
})

router.get('/error', (req, res) => {
    throw new Error('Forced error')
})

module.exports = router