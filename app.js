'use strict';

var express = require('express'),
  app       = express(),
  bluemix   = require('./config/bluemix'),
  extend    = require('util')._extend,
  watson    = require('watson-developer-cloud'),
  mongoose = require('mongoose');

// Bootstrap application settings
require('./config/express')(app);

var User = require( './config/models/User.js' );
var Call = require( './config/models/Call.js' );


var credentials = extend({
    url: 'mongodb://IbmCloud_egenbukb_85n5pafd_7tldin3o:8WDNcy5Y8wuujC5Px9XJL7hkcRKMsvea@ds045464.mongolab.com:45464/IbmCloud_egenbukb_85n5pafd'
}, bluemix.getServiceCreds('XYZZZ'));
//mongoose.connect('mongodb://IbmCloud_egenbukb_85n5pafd_7tldin3o:8WDNcy5Y8wuujC5Px9XJL7hkcRKMsvea@ds045464.mongolab.com:45464/IbmCloud_egenbukb_85n5pafd');
mongoose.connect(credentials.url);


// render index page
app.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if (err) throw err;
        // object of all the users
        //res.json(users);
        res.render('index', {users: users});
    });
  
});


app.get('/saveUser', function (req, res) {
  res.send('Hello World!fff');
    var test = new User();

test.save(function(err) {
  if (err) throw err;
  console.log('User saved successfully!');
});
    
});

app.get('/saveCall', function (req, res) {
  res.send('Hello World!fff');
    var test = new Call();

test.save(function(err) {
  if (err) throw err;
  console.log('Call saved successfully!');
});
    
});



app.get('/listCalls', function (req, res) {
    Call.find({}, function(err, users) {
        if (err) throw err;
        // object of all the users
        res.json(users);
    });
});

app.get('/listUsers', function (req, res) {
    User.find({}, function(err, users) {
        if (err) throw err;
        // object of all the users
        res.json(users);
    });
});


//
//var server = app.listen(3000, function () {
//  var host = server.address().address;
//  var port = server.address().port;
//
//  console.log('Example app listening at http://%s:%s', host, port);
//});

var port = process.env.VCAP_APP_PORT || 3000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Owl is listening at http://%s:%s', host, port);
});