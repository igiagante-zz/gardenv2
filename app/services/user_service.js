/**
 * Created by igiagante on 12/8/16.
 */

"use strict";

let User = require('../models/user');


let addGardenIdToUser = function (userId, gardenId, addGardenIdToUserCallback) {

    User.findOne({_id: userId}, function (err, user) {
        if (err) {
            return addGardenIdToUserCallback(err);
        }

        if(user._doc && user._doc.gardensIds) {
            user._doc.gardensIds.push(gardenId);
        }

        user.save(function (err) {
            if (err) {
                return addGardenIdToUserCallback(err);
            }

            return addGardenIdToUserCallback(undefined, user);
        });
    });
};

let removeGardenIdFromUser = function (userId, gardenId, addGardenIdToUserCallback) {

    User.findOne({_id: userId}, function (err, user) {
        if (err) {
            return addGardenIdToUserCallback(err);
        }

        let gardensIds = user._doc.gardensIds;
        if(gardensIds) {
            let index = gardensIds.indexOf(gardenId);
            gardensIds.splice(index, 1);
        }

        user.save(function (err) {
            if (err) {
                return addGardenIdToUserCallback(err);
            }

            return addGardenIdToUserCallback(undefined, user);
        });
    });
};

module.exports = {
    addGardenIdToUser: addGardenIdToUser,
    removeGardenIdFromUser: removeGardenIdFromUser
};
