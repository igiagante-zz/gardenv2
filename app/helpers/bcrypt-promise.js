/**
 * Created by Ignacio Giagante on 19/12/17.
 */

let bcrypt = require('bcrypt');

// first generate a random salt
let genSalt = function (password) {
    return new Promise((resolve,reject) => {
        bcrypt.genSalt(10,function(err,salt) {
            if (err) {
                reject(err);
            }
            else {
                resolve({
                    salt:salt,
                    password:password
                });
            }
        });
    });
};

// hash the password with the salt
let genHash = function(salt, password) {
    return new Promise((resolve,reject) => {
        bcrypt.hash(password,salt,null,function(err,hash) {
            if (err) {
                reject(err);
            }
            else {
                resolve({
                    salt:salt,
                    password:password,
                    hash:hash
                });
            }
        });
    });
};

module.exports = { genHash, genSalt };