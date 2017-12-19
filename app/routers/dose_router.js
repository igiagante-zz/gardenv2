"use strict";

let express = require('express'),
    doseCtrl = require('../controllers/dose_controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/doses - Get list of doses */
    .get(doseCtrl.getAll)

    /** POST /api/doses - Create new dose */
    .post(doseCtrl.createDose);

router.route('/:dose_id')
    /** GET /api/doses/:doseId - Get dose */
    .get(doseCtrl.getDose)

    /** PUT /api/doses/:doseId - Update dose */
    .put(doseCtrl.updateDose)

    /** DELETE /api/doses/:doseId - Delete dose */
    .delete(doseCtrl.deleteDose);

module.exports = router;