let express = require('express'),
    userRouter = require('./user_router'),
    gardenRouter = require('./garden_router'),
    doseRouter = require('./dose_router'),
    irrigationRouter = require('./irrigation_router'),
    plantRouter = require('./plant_router'),
    nutrientRouter = require('./nutrient_router'),
    flavorRouter = require('./flavor_router'),
    attributeRouter = require('./attribute_router'),
    plagueRouter = require('./plague_router'),
    sensorRouter = require('./sensor_router'),
    authService = require('../services/auth_service');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);

// middleware to use for all requests in order to verify if the user is authorized
let isUserAuthenticated = function (req, res, next) {

    let token = req.headers.authorization;
    if (!token) {
        return res
            .status(403)
            .send({message: "Your request does not have header Authorization"});
    }
    authService.isUserAuthenticated(token, function (err) {
        if (err) {
            return res.status(403).send({message: 'Authentication failed. User not found.'});
        } else {
            next();
        }
    });
};

router.use('/dose', isUserAuthenticated, doseRouter);
router.use('/garden', isUserAuthenticated, gardenRouter);
router.use('/irrigation', isUserAuthenticated, irrigationRouter);
router.use('/plant', isUserAuthenticated, plantRouter);
router.use('/nutrient', isUserAuthenticated, nutrientRouter);
router.use('/sensor',  sensorRouter);
router.use('/user', userRouter);
router.use('/attribute', attributeRouter);
router.use('/plague', plagueRouter);
router.use('/flavor', flavorRouter);


module.exports = router;