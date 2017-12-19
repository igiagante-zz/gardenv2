"use strict";

let express = require('express'),
    irrigationCtrl = require('../controllers/irrigation_controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/irrigations - Get list of irrigations */
    .get(irrigationCtrl.getAll)

    /** POST /api/irrigations - Create new irrigation */
    .post(irrigationCtrl.createIrrigation);

router.route('/:irrigation_id')
    /** GET /api/irrigations/:irrigationId - Get irrigation */
    .get(irrigationCtrl.getIrrigation)

    /** DELETE /api/irrigations/:irrigationId - Delete irrigation */
    .delete(irrigationCtrl.deleteIrrigation);

module.exports = router;




