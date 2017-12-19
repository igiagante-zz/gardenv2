/**
 * Created by igiagante on 27/5/16.
 */

"use strict";

let express = require('express'),
    flavorCtrl = require('../controllers/flavor_controller');

const router = express.Router(); // eslint-disable-line new-cap

//get all flavors
router.get('/', flavorCtrl.getAll);

module.exports = router;
