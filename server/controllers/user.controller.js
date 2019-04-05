
const User = require('../models/user.model')
const keys = require('../../config/keys')
const bcrypt = require('bcryptjs')
const jwt = require('../services/jwt')

module.exports = {
    create: async (req, res) => {
        if (!req.body) {
            return res.status(400).send('Request body is missing')
        }
        
        try {
            try {
                let password = await bcrypt.hash(req.body.password, keys.saltingRounds) 
                req.body.password = password
            } catch (error) {
                res.status(500).send('Internal server error')            
            }
            let user = new User(req.body)
            const data = await user.save()
            res.status(201).send(data)
        } catch (error) {
            res.status(500).json(err)
        }

    },

    login: async (req, res) => {
        if (!req.body) {
            return res.status(400).send('Request body is missing')
        }

        const { email, password } = req.body
        try {
            let user =  await User.findOne({email: email}).exec()
            console.log(user.password)

            bcrypt.compare(password, user.password, (err, match) => {
                if (err) { res.status(500).send('bcrypt error') }

                if (match) {
                    // jwt
                    const payload = { user_id: user.id }
                    const $Options = { 
                        issuer:  "us",
                        subject:  "s",
                        audience:  "a",
                    }
                    const token = jwt.sign(payload, $Options)
                    res.status(200).send(token)

                } else {
                    res.status(400).send('invalid passowrd')
                    // not match: invalid email/password combination
                }
            })
        } catch (error) {
            // send error msg, user not found
            res.status(400).send('user not found with the email')
        } 
       
    }


}