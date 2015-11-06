'use strict';

var express = require('express'),
    app = express(),
    bluemix = require('./config/bluemix'),
    extend = require('util')._extend,
    watson = require('watson-developer-cloud'),
    mongoose = require('mongoose'),
    moment = require('moment'),
    _ = require('lodash');

// Bootstrap application settings
require('./config/express')(app);
app.locals.moment = require('moment');
app.locals._ = require('lodash');

var sentiment_bar = {
    1: "Good",
    2: "Medium",
    3: "Bad"
};

var User = require('./config/models/User.js');
var Call = require('./config/models/Call.js');


var credentials = extend({
    url: 'mongodb://IbmCloud_egenbukb_85n5pafd_7tldin3o:8WDNcy5Y8wuujC5Px9XJL7hkcRKMsvea@ds045464.mongolab.com:45464/IbmCloud_egenbukb_85n5pafd'
}, bluemix.getServiceCreds('XYZZZ'));
//mongoose.connect('mongodb://IbmCloud_egenbukb_85n5pafd_7tldin3o:8WDNcy5Y8wuujC5Px9XJL7hkcRKMsvea@ds045464.mongolab.com:45464/IbmCloud_egenbukb_85n5pafd');

mongoose.connect(credentials.url);


// render index page
app.get('/', function (req, res) {
    Call.find({}).sort('date').populate('_user').exec().then(function (calls) {

        //        var result = _.reduce(users, function (result, n, key) {
        //            var sentiment = _.floor(n.sentiment);
        //            result[sentiment] = (result[sentiment] || 0) + 1;
        //            return result;
        //        }, {});

        //        var graph = {};
        //        graph.data = [];


        //        _.forOwn(result, function (value, key) {
        //            graph.data.push({
        //                label: sentiment_bar[key],
        //                value: value
        //            });
        //        });


        var users = _.pluck(_.uniq(calls, '_user'), '_user');
        var calls = _.groupBy(calls, '_user._id');

        var temp = [];
        for (var i = 0; i < 24; i++) {
            temp[i] = i + (i < 12 ? "AM" : "PM")
        };
        var dataT = {
            labels: temp,
            //            labels: [],
            datasets: [
//                {
//                    label: "My First dataset",
//                    fillColor: "rgba(220,220,220,0.2)",
//                    strokeColor: "rgba(220,220,220,1)",
//                    pointColor: "rgba(220,220,220,1)",
//                    pointHighlightFill: "#fff",
//                    data: [1, 2, 3, 3, 2, 1, 1, 1, 1]
//        }
    ]
        };

        _.forOwn(calls, function (calls_arr, key) {
            //            console.log("----------------");
            console.log(key);
            temp = [];
            for (var i = 0; i < 24; i++) {
                temp[i] = 0
            };
            _.forEach(calls_arr, function (call, key) {
                console.log("bbb");
                var hour = moment(call.date).format('HH')
                console.log(Number(hour));
                temp[Number(hour)] = call.sentiment;
            });

            dataT.datasets.push({
                label: key,
                data: temp
            })
        });

        res.render('1_team', {
            users: users,
            graph_data: dataT
        });
    });
});

app.get('/user/:username', function (req, res) {
    var username = req.params.username;

    User.findOne({
            _id: username
        }).exec()
        .then(function (user) {
            var result = [];
            return Call.find({
                    _user: username
                }).sort('date').populate('_user').exec()
                .then(function (calls) {
                    return [user, calls];
                });
        })
        .then(function (result) {
            var user = result[0];
            var calls = result[1];


            var dataT = {
                labels: [],
                //            labels: [],
                datasets: [
//                {
//                    label: "My First dataset",
//                    fillColor: "rgba(220,220,220,0.2)",
//                    strokeColor: "rgba(220,220,220,1)",
//                    pointColor: "rgba(220,220,220,1)",
//                    pointHighlightFill: "#fff",
//                    data: [1, 2, 3, 3, 2, 1, 1, 1, 1]
//        }
    ]
            };
            var temp = [];
            _.forEach(calls, function (call, key) {

                dataT.labels.push(moment(call.date).format('DD/MM HH:mm'));
                temp.push(call.sentiment);



            });
            dataT.datasets.push({
                label: user._id,
                data: temp
            })
            res.render('2_user', {
                user: user,
                calls: calls,
                graph_data: dataT
            });
        });
});

app.get('/user/:username/call/:callid', function (req, res) {
    var username = req.params.username;
    var callid = req.params.callid;
    User.findOne({
            _id: username
        }).lean().exec()
        .then(function (user) {
            var result = [];
            return Call.findOne({
                    _id: callid
                }).lean().exec()
                .then(function (call) {
                    return [user, call];
                });
        })
        .then(function (result) {
            var user = result[0];
            var call = result[1];
            res.render('3_call', {
                user: user,
                call: call
            });
        });
});


app.get('/rest/user/:username', function (req, res) {
    var username = req.params.username;

    User.find({
        username: username
    }, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
});

app.get('/rest/users', function (req, res) {
    User.find({}, function (err, users) {
        if (err) throw err;
        // object of all the users
        res.json(users);
    });
});

app.post('/rest/user/create', function (req, res) {
    console.log(req.body);

    var obj = new User(req.body);
    //console.log(newCall);
    obj.save(function (err) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('saved successfully!');
        res.json({
            msg: 'OK'
        });
    });
});


app.get('/rest/call/:callid', function (req, res) {
    var callid = req.params.callid;

    Call.find({
        _id: callid
    }, function (err, call) {
        if (err) throw err;
        res.json(call);
    });
});

app.get('/rest/calls', function (req, res) {
    Call.find({}, function (err, calls) {
        if (err) throw err;
        // object of all the users
        res.json(calls);
    });
});

app.post('/rest/call/create', function (req, res) {
    //    console.log(req.body);

    var obj = new Call(req.body);
    console.log('saved successfully1!');
    //console.log(newCall);
    obj.save(function (err) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log('saved successfully!');
        res.json({
            msg: 'OK'
        });
    });
});

app.get('/create', function (req, res) {
    res.render('createCall', {
        teste: 'sasdasd'
    });
});

app.get('/users/create', function (req, res) {
    res.render('createUser');
});

app.get('/saveUser', function (req, res) {
    res.send('Hello World!fff');
    var test = new User();

    test.save(function (err) {
        if (err) throw err;
        console.log('User saved successfully!');
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