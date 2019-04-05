const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')

const privateKey = fs.readFileSync(path.join(__dirname,'../../config/private.key'), 'utf8')
const publicKey = fs.readFileSync(path.join(__dirname, '../../config/public.key'), 'utf8')

module.exports = {
    sign: (payload, $Options) => {
        /*
        sOptions = {
        issuer: "Authorizaxtion/Resource/This server",
        subject: "iam@user.me", 
        audience: "Client_Identity" // this should be provided by client
        }
        */
        // Token signing options
        const signOptions = {
            issuer:  $Options.issuer,
            subject:  $Options.subject,
            audience:  $Options.audience,
            expiresIn:  "7d",    // 7 days validity
            algorithm:  "RS256"    
        }

        return jwt.sign(payload, privateKey, signOptions)
    },

   verify: (token, $Option) => {
        /*
        vOption = {
        issuer: "Authorization/Resource/This server",
        subject: "iam@user.me", 
        audience: "Client_Identity" // this should be provided by client
        }  
        */
        const verifyOptions = {
            issuer:  $Option.issuer,
            subject:  $Option.subject,
            audience:  $Option.audience,
            expiresIn:  "7d",
            algorithm:  ["RS256"]
        }

        try {
            return jwt.verify(token, publicKey, verifyOptions)
        } catch (err){

            return false
        }
    },

    decode: (token) => {
        return jwt.decode(token, {complete: true})
        //returns null if token is invalid
    }
}