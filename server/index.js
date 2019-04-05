const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('../config/keys')
const bodyParser = require('body-parser')
const logger = require('morgan')
require('./models/user.model')
require('./services/passport')

mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
        .then(() => console.log("mongodb connected...."))

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
)
    
app.use(passport.initialize())
app.use(passport.session())
    
require('./routes/user.auth.route')(app)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.info(`Server listen on port ${PORT}`))