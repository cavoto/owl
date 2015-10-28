var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var callSchema = new Schema({
    username:  { type: String, default: 'paulmc' },
    creationDate: { type: Date, default: Date.now },
    date: { type: Date, default: Date.now },
    sentiment: { type: Number, default: 3 },
    text: { type: String, default: 'Blackbird singin in the dawn of night ?' },
    audioFile: { type: String, default: 'MyConversationLogPaulMc.wav' }
});

callSchema.post("save", function (result) {
    var self = this;
console.log(result);
    mongoose.models["User"].findOne( { username: self.username }, function (err, user) {        
        if (user) {
            console.log("User found");
        } else {
            console.log("User not found");
            var User = mongoose.model('User');
            var newUser = new User({ username: self.username });
            newUser.save(function (err) {
                if (err) throw err;
                console.log('User created!');
            });
        }
    });
});

var Call = mongoose.model('Call', callSchema);

module.exports = Call;