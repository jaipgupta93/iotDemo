var express = require('express');
var router = express.Router();
var utils = require('../utils');

/* Called from Heroku App */
router.get('/', function (req, res) {
    var uid = utils.random_id();
    res.render('map', {lat: process.env.YOUR_LATITUDE, lon: process.env.YOUR_LONGITUDE, heroku_page: true, uid: uid});
});

/* Called from Salesforce */
router.post('/', function (req, res) {
    res.render('map', {lat: process.env.YOUR_LATITUDE, lon: process.env.YOUR_LONGITUDE, heroku_page: false});
});

router.get('/cockpit/:uid', function (req, res) {
    res.render('cockpit', { pusher_key: process.env.PUSHER_KEY, uid: req.param("uid") });
});

router.get('/androidcockpit/:uid', function (req, res) {
    res.render('androidcockpit', { pusher_key: process.env.PUSHER_KEY, uid: req.param("uid") });
});

module.exports = router;







