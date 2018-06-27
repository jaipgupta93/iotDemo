var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:uid', function (req, res) {
    var template_name = req.query.t;
    console.log('params : ' + template_name);
    if(template_name == null || template_name == '') {
      template_name = 'thing';
    }
    console.log('template is : ' + template_name);
    res.render(template_name, {pusher_key: process.env.PUSHER_KEY, uid: req.params.uid, lat: process.env.YOUR_LATITUDE, lon: process.env.YOUR_LONGITUDE});
});


module.exports = router;