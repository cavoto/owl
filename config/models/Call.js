var mongoose = require('mongoose');
// load the modern build
var _ = require('lodash');

var Schema = mongoose.Schema;

var callSchema = new Schema({
    username:  { type: String, default: 'paulmc' },
    creationDate: { type: Date, default: Date.now },
    date: { type: Date, default: Date.now },
    sentiment: { type: Number, default: 3 },
    text: { type: String, default: 'Blackbird singin in the dawn of night ?' },
    audioFile: { type: String, default: 'MyConversationLogPaulMc.wav' }
});

callSchema.post("save", function (savedCall) {
    var self = this;
//    console.log(result);
    mongoose.models["User"].findOne( { username: self.username }, function (err, user) {
        if (user) {
            console.log("User found");
            user.calls = user.calls + 1;
            user.sentiment_sum = user.sentiment_sum + savedCall.sentiment;
            user.sentiment = user.sentiment_sum/user.calls;
            user.save(function (err) {
                if (err) throw err;
                console.log('User updated!');
            });
        } else {
            console.log("User not found");
            var User = mongoose.model('User');
            var newUser = new User({ username: self.username });
            newUser.calls = 1;
            newUser.sentiment_sum = savedCall.sentiment;
            newUser.sentiment = savedCall.sentiment;
            newUser.save(function (err) {
                if (err) throw err;
                console.log('User created!');
            });
        }
    });
});

callSchema.post("save", function (newCall) {
    var self = this;
    console.log("-------");


    var User = mongoose.model('User');
    var Call = mongoose.model('Call');

    User.findOne({
            username: newCall.username
        }).lean().exec()
        .then(function (user) {
            var result = [];
            return Call.find({
                    username: username
                }).lean().exec()
                .then(function (calls) {
                    return [user, calls];
                });
        })
        .then(function (result) {
            var user = result[0];
            var calls = result[1];
            res.render('user', {
                user: user,
                calls: calls
            });
        });
});

var Call = mongoose.model('Call', callSchema);

module.exports = Call;
