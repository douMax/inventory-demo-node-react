
const User = require('../models/user.model')

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }

    let model = new User(req.body)
    model.save()
        .then( doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc)
            } else {
                res.status(201).send(doc)
            }
        })
        .catch(err => {
            console.log('catched err')
            res.status(500).json(err)
        })

}