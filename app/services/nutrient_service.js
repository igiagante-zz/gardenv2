/**
 * Created by igiagante on 14/7/16.
 */

"use strict";

let Nutrient = require('../models/nutrient'),
    utilObject = require('../helpers/util_object'),
    async = require('async'),
    logger = require('../utils/logger');

/**
 * Get nutrient's info using its name
 * @param name Nutrient's Name
 * @param getNutrientCallback
 */
let getNutrientInfoByName = function (name, getNutrientCallback) {

    Nutrient.find({"name": name}, function (error, nutrient) {
        if (error) {
            logger.debug('The plant wasn\'t found');
            return getNutrientCallback(error);
        }
        getNutrientCallback(undefined, nutrient);
    });
};

/**
 * Return resources ids related to the images from database.
 * @param nutrient Represent the model which contains the images
 * @param callback
 * @returns {Array} Represent resources ids images
 */
let getResourcesIdsImagesForNutrient = function (nutrient, callback) {

    logger.debug(' Getting resources ids images from model ');

    let resourcesIds = [];

    if (nutrient === null) {
        return callback('The nutrient is undefined');
    }

    let nutrientParsed = JSON.parse(JSON.stringify(nutrient));

    if (nutrientParsed && nutrientParsed.images) {
        for (let i = 0; i < nutrientParsed.images.length; i++) {
            resourcesIds.push(nutrientParsed.images[i].id);
        }
    }

    nutrient.resourcesIds = resourcesIds;
    callback(undefined, nutrient);
};

/**
 * Get Nutrient id using its name
 * @param name
 * @param getNutrientIdCallback
 */
let getNutrientId = function (name, getNutrientIdCallback) {
    Nutrient.findOne({name: name}, function (err, nutrient) {
        if (err) {
            return getNutrientIdCallback(err);
        }
        utilObject.convertItemId(nutrient, function () {
            return getNutrientIdCallback(undefined, nutrient)
        });
    });
};

/**
 * Convert the MongoDB ObjectId to id
 * @param nutrients Nutrient List
 * @param convertIdsFromMongoCallback
 */
let convertIdsFromMongo = function (nutrients, convertIdsFromMongoCallback) {

    async.each(nutrients, function (nutrient, callback) {
        utilObject.convertItemsId(nutrient.images, callback);
    }, function (err) {
        if (err) {
            return convertIdsFromMongoCallback(err);
        }
        convertIdsFromMongoCallback(undefined);
    });
};


let convertChildrenIds = function (nutrient, convertChildrenIdsCallback) {
    utilObject.convertItemsId(nutrient.images, function () {
        convertChildrenIdsCallback(undefined, nutrient);
    });
};

/**
 * Get final nutrient
 * @param nutrient
 * @param getNutrientCallback
 */
let getNutrient = function (nutrient, getNutrientCallback) {

    async.waterfall([

        function (callback) {
            logger.debug(' Getting nutrient ID ');
            getNutrientId(nutrient._doc.name, callback);
        },
        function (nutrient, callback) {
            logger.debug(' Convert nutrients images ids ');
            convertChildrenIds(nutrient, callback);
        },
        function (nutrient, callback) {
            logger.debug(' get Resources Ids Images For Nutrient ');
            getResourcesIdsImagesForNutrient(nutrient, callback);
        }
    ], function (err, result) {
        if (err) {
            return getNutrientCallback(err);
        }
        return getNutrientCallback(undefined, result);
    });
};

let getNutrientsByUserId = function (userId, getNutrientsByUserIdCallback) {

    Nutrient.find({userId: userId}, function (err, nutrients) {
        if (err) {
            return getNutrientsByUserIdCallback(err);
        }

        utilObject.convertItemsId(nutrients, function () {
            convertImagesIdsFromNutrients(nutrients, function () {
                return getNutrientsByUserIdCallback(undefined, nutrients);
            });
        });
    });
};


/**
 * Convert the property _id to id in each item from a list
 * @param nutrients
 * @param callbackNutrients
 */
let convertImagesIdsFromNutrients = function (nutrients, callbackNutrients) {

    async.each(nutrients, function (nutrient, callback) {
        utilObject.convertItemsId(nutrient.images, callback);
    }, function (err) {
        if (err) {
            return callbackNutrients(err);
        }
        callbackNutrients(undefined);
    });
};

module.exports = {
    getNutrientInfoByName: getNutrientInfoByName,
    getResourcesIdsImagesForNutrient: getResourcesIdsImagesForNutrient,
    getNutrientId: getNutrientId,
    getNutrient: getNutrient,
    convertIdsFromMongo: convertIdsFromMongo,
    getNutrientsByUserId: getNutrientsByUserId
};
