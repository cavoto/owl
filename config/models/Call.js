var mongoose = require('mongoose');
// load the modern build
var _ = require('lodash');

var Schema = mongoose.Schema;

var callSchema = new Schema({
    _user:  { type: Schema.Types.String, ref: 'User'},
    creationDate: { type: Date, default: Date.now },
    date: { type: Date, default: Date.now },
    sentiment: { type: Number, default: 3 },
    text: { type: String, default: 'Blackbird singin in the dawn of night ?' },
    audioFile: { type: String, default: 'MyConversationLogPaulMc.wav' }
});

callSchema.post("save", function (toBeSavedCall) {
    var self = this;
//    console.log(result);
    mongoose.models["User"].findOne( { _id: self._user }, function (err, user) {
        if (user) {
            console.log("User found");
            user.calls = user.calls + 1;
            user.sentiment_sum =user.sentiment_sum + toBeSavedCall.sentiment;
            
            user.sentiment = user.sentiment_sum/user.calls;

            user.save(function (err) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log('User updated!');
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
