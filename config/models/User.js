var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username:  { type: String, default: 'Paul' },
    sentiment: { type: Number, default: 3 }
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