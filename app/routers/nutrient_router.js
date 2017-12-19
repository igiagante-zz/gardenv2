"use strict";

let express = require('express'),
    nutrientCtrl = require('../controllers/nutrient_controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/nutrients - Get list of nutrients */
    .get(nutrientCtrl.getAll)

    /** POST /api/nutrients - Create new nutrient */
    .post(nutrientCtrl.createNutrient);

router.route('/:plant_id')
    /** GET /api/nutrients/:nutrientId - Get nutrient */
    .get(nutrientCtrl.getAll)

    /** PUT /api/nutrients/:nutrientId - Update nutrient */
    .put(nutrientCtrl.updateNutrient)

    /** DELETE /api/nutrients/:nutrientId - Delete nutrient */
    .delete(nutrientCtrl.deleteNutrient);

/** GET /api/nutrients/user/:username - Get list of nutrients by username */
router.route('/user/:username').get(nutrientCtrl.getNutrientsByUserName);

module.exports = router;