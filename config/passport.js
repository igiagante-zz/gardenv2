let passport = require('passport-jwt');

let JwtStrategy = passport.Strategy,
    ExtractJwt = passport.ExtractJwt;

// load up the user model
let User = require('../app/models/user');
let config = require('../config/config');

module.exports = function() {

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.jwtSecret;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        User.getById( jwt_payload.id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};