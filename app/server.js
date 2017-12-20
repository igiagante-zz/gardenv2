"use strict";

let mongoose = require('mongoose');
let util = require('util');

// config should be imported before importing any other file
let config = require('../config/config');
let app = require('../config/express');

const debug = require('debug')('garden:server');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { useMongoClient: true });
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/', function (req, res) {
    res.json({message: ' Main page '});
});

// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log(' Starting Server at port: ' + config.port);

module.exports = app;