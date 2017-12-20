let Promise = require('bluebird'),
    mongoose = require('mongoose'),
    httpStatus = require('http-status'),
    APIError = require('../helpers/APIError'),
    bcrypt = require('bcrypt'),
    bcryptPromise = require('../helpers/bcrypt-promise');

let Schema = mongoose.Schema;

/**
 * User Schema
 */
const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gardensIds: [{_id: Schema.Types.ObjectId}],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {

    let user = this;

    if (this.isModified('password') || this.isNew) {

        bcryptPromise.genSalt(user.password)
            .then( result => {
                return bcryptPromise.genHash(result.salt,result.password);
            })
            .then( hash => {
                user.password = hash;
                return next(user);
            })
            .catch(function(err) {
                return next(err);
            });

    } else {
        return next();
    }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({

    comparePassword (password, cb) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    }
});

/**
 * Statics
 */
UserSchema.statics = {
    /**
     * Get user by id
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    getById(id) {
        return this.findById(id)
            .exec()
            .then((user) => {
                if (user) {
                    return user;
                }
                const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * Get user by name
     * @param {String} name - The user's name.
     * @returns {Promise<User, APIError>}
     */
    getByName(name) {
        return this.findOne({ name: name })
            .exec()
            .then((user) => {
                if (user) {
                    return user;
                }
                const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List users in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);



