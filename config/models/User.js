var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
//    _username     : Number,
    _id:  { type: String },
    firstName:  { type: String },
    lastName:  { type: String },
    picture:  { type: String, default: 'user.png' },
    sentiment: { type: Number, default: 0 },
    calls: { type: Number, default: 0 },
    sentiment_sum: { type: Number, default: 0 }
});

var User = mongoose.model('User', userSchema);

module.exports = User;