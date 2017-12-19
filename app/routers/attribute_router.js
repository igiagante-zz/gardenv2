/**
 * @author Ignacio Giagante, on 3/6/16.
 */

"use strict";

let express = require('express'),
    attributeCtrl = require('../controllers/attribute_controller');

const router = express.Router(); // eslint-disable-line new-cap

//get all attributes
router.get('/', attributeCtrl.getAll);

//get mock attributes
router.get('/mock', attributeCtrl.getAttributesMock);

module.exports = router;