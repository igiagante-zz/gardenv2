/**
 * @author Ignacio Giagante, on 6/4/16.
 */

"use strict";

let express = require('express'),
    plaguesCtrl = require('../controllers/plague_controller');

const router = express.Router(); // eslint-disable-line new-cap

//get all plagues
router.get('/', plaguesCtrl.getAll);

module.exports = router;
