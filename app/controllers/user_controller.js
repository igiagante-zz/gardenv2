/**
 * Created by igiagante on 29/7/16.
 */

"use strict";

let User = require('../models/user'),
    jwt = require('passport-jwt'),
    moment = require('moment'),
    config = require('../../config/config'),
    APIError = require('../helpers/APIError'),
    httpStatus = require('http-status');

let invalidUser = 'INVALID_USER';
let userNotFound = 'USER_NOT_FOUND';
let wrongPassword = 'WRONG_PASSWORD';

let _createToken = function(user) {
    let payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(1, "days").unix()
    };
    return jwt.encode(payload, config.jwtSecret);
};

let signup = function(req, res, next) {

    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
    } else {

        let newUser = new User({
            name: req.body.username,
            password: req.body.password
        });

        newUser.save()
            .then(savedUser => res.status(200).json({token : _createToken(savedUser)}))
            .catch(e => next(e));
    }
};

let login = function(req, res, next) {

    User.getByName(req.body.username)
        .then( user => {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    let token = _createToken(user);
                    // return the information including token as JSON
                    res.status(200).json({token: token});
                } else {
                    res.status(403).send({message: wrongPassword});
                }
            });
        })
        .catch(e => {
            const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
            return next(err);
        });
};

let refreshToken = function(req, res, next) {

    User.getById(req.body.userId)
        .then( user => {
            if (!user) {
                res.send({message: userNotFound});
            } else {
                // if user is found, lets create a token
                let token = _createToken(user);
                // return the information including token as JSON
                return res.status(200).json({token: token});
            }
        })
        .catch(e => next(e));
};

module.exports = {
    signup: signup,
    login: login,
    refreshToken: refreshToken
};