var express = require('express');

var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var routes = require('./routes/index');
var api = require('./routes/api');
var thing = require('./routes/thing');
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
var app = express();
var auth = require("basic-auth");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/thing', thing);

app.use('/', routes);

app.use(function (req, res, next) {
    console.log("Wrong URL Error: " + req.originalUrl);
    res.status(404);
    res.render('error', {
        message: 'Page Not Found!!!'
    });
});

app.use(function (err, req, res, next) {
    console.log("Program Error: " + req.originalUrl);
    console.log(err);

        var email = new sendgrid.Email({
                to: process.env.YOUR_EMAIL,
                from: process.env.YOUR_EMAIL,
                subject: 'Error at IoTGateway',
                text: err.toString()
            }
        );

        sendgrid.send(email, function (err, json) {
            if (err) {
                return console.error(err);
            }
        })

    res.status(err.status || 500);
    res.render('error', {
        message: 'Please ask your Administrator',
        error: err
    });
});

module.exports = app;


