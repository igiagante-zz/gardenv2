/**
 * Created by igiagante on 28/9/15.
 */

"use strict";

let express = require('express'),
    sensorCtrl = require('../controllers/sensor_controller');

const router = express.Router(); // eslint-disable-line new-cap

//process sensor's data
router.post('/', sensorCtrl.processDataSensor);

//get measures from one sensor
router.get('/measures/:sensor_id', sensorCtrl.measures);

//get measures
router.get('/', sensorCtrl.getDataSensors);

router.get('/actual', sensorCtrl.getActualTempAndHumd);

module.exports = router;
