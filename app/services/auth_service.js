/**
 * Created by igiagante on 29/7/16.
 */

let jwt = require('jwt-simple'),
    config = require('../../config/config'),
    User = require('../models/user');

let isUserAuthenticated = function (token, isUserAuthenticatedCallback) {

    let payload = jwt.decode(token, config.jwtSecret);

    User.findOne({
        _id: payload.sub
    }, function (err, user) {

        if (err) {
            return isUserAuthenticatedCallback(err);
        }
        return isUserAuthenticatedCallback(undefined, user);
    });
};

module.exports = { isUserAuthenticated };