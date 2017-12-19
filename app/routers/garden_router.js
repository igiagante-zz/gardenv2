"use strict";

let express = require('express'),
    gardenCtrl = require('../controllers/garden_controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/gardens - Get list of gardens */
    .get(gardenCtrl.getAll)

    /** POST /api/gardens - Create new garden */
    .post(gardenCtrl.createGarden);

router.route('/:garden_id')
    /** GET /api/gardens/:gardenId - Get garden */
    .get(gardenCtrl.getGarden)

    /** PUT /api/gardens/:gardenId - Update garden */
    .put(gardenCtrl.updateGarden)

    /** DELETE /api/gardens/:gardenId - Delete garden */
    .delete(gardenCtrl.deleteGarden);

/** GET /api/gardens/user/:username - Get list of gardens by username */
router.route('/user/:username').get(gardenCtrl.getGardensByUserName);

module.exports = router;