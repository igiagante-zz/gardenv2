"use strict";

let express = require('express'),
    plantCtrl = require('../controllers/plant_controller'),
    multer = require('multer');

const upload = multer({ dest: 'uploads/'});
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/plants - Get list of plants */
    .get(plantCtrl.getAll)

    /** POST /api/plants - Create new plant */
    .post(plantCtrl.createPlant, upload.array('files', 10));

router.route('/:plant_id')
    /** GET /api/plants/:plantId - Get plant */
    .get(plantCtrl.getPlant)

    /** PUT /api/plants/:plantId - Update plant */
    .put(plantCtrl.updatePlant)

    /** DELETE /api/plants/:plantId - Delete plant */
    .delete(plantCtrl.deletePlant);

module.exports = router;