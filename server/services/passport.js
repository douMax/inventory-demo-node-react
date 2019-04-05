const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../../config/keys')


const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id)
}) // serialize and set in the cookie

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
}) // deserialize id in cookie and get back the user


passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then((existingUser) => {
                    if (existingUser) {
                        // user already exists
                        done(null, existingUser)
                    } else {
                        new User({googleId: profile.id}).save()
                            .then( user => done(null, user) )
                    }
                })
		}
	)
)
