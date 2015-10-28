var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var callSchema = new Schema({
    user:  String,
    creationDate: { type: Date, default: Date.now },
    date: { type: Date, default: Date.now },
    sentiment: Number,
    text: String,
    audioFile: String
});


var Call = mongoose.model('Call', callSchema);


module.exports = Call;