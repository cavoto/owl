var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:  { type: String, default: 'paulmc' },
    firstName:  { type: String, default: 'Paul' },
    lastName:  { type: String, default: 'Mc' },
    picture:  { type: String, default: 'user.png' },
    sentiment: { type: Number, default: 3 },
    calls: { type: Number, default: 0 },
    sentiment_sum: { type: Number, default: 3 }
});

//callSchema.pre("save", function(next) {
//    var self = this;
//
//    mongoose.models["Call"].findOne({username : self.user},function(err, user) {
//        console.log("e ai ?");
//        if(user) {
//            console.log("achei");
//        } else {
//            console.log("nao achei");
//        }
//        }
//    });
//    next();
//});

var User = mongoose.model('User', userSchema);

module.exports = User;