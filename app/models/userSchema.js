/**
 * Created by nikhi on 2/28/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    mobile:String,
    otp:String,
});

module.exports = mongoose.model('ExpManDb',userSchema);