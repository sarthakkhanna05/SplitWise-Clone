import passportLocal from "passport-local";
import User from "../Models/user.js"
import {
    validatePassword
} from "../Utilities/hashing.js";
import passportJWT from "passport-jwt";
import dotenv from 'dotenv';
import passport from "passport";

const dot = dotenv.config();

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const options = {};
options.jwtFromRequest = ExtractJwt.fromHeader("jwt");
options.secretOrKey = process.env.TOKEN_SECRET;

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {

    // We will assign the `sub` property on the JWT to the database ID of user
    await User.findById(jwt_payload._id, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    });
}));

export const auth = passport.authenticate('jwt', {
    session: false
})