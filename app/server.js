"use strict";

let moongose = require('mongoose');
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
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/', function (req, res) {
    res.json({message: ' Main page '});
});

//static
console.log('process.cwd(): ' + process.cwd());
app.use(express.static(process.cwd() + '/public'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(' Starting Server at port: ' + port);

module.exports = app;