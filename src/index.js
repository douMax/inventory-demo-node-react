const express = require('express')

const app = express()

let personRoute = require('./routes/person')

app.use(personRoute)
app.use(express.static('public'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.info(`Server listen on port ${PORT}`))