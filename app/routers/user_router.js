/**
 * Created by igiagante on 28/7/16.
 */

"use strict";

let express = require('express'),
    userCtrl = require('../controllers/user_controller');

const router = express.Router(); // eslint-disable-line new-cap

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

router.post('/refreshToken', userCtrl.refreshToken);

module.exports = router;