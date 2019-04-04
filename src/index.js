const express = require('express')
const mongoose = require('mongoose')
const keys = require('../config/keys')

const app = express()
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
        .then(res => console.log("mongodb connected...."))

const personRoute = require('./routes/person')
const userRoute = require('./routes/user.route')

const path = require('path')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})

app.use(personRoute)
app.use(userRoute)
app.use(express.static('public'))

// handler for 404 not found
app.use((req, res, next) => {
    res.status(404).send('You seem lost, Resource not found')
})

// handler for Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)

    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.info(`Server listen on port ${PORT}`))