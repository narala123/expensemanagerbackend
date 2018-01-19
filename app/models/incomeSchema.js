/**
 * Created by nikhi on 3/2/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var incomeSchema = new Schema({
    Date:Date,
    Category:String,
    Amount : Number,
    Received : String,
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"ExpManDb"},
    teamId:{type:mongoose.Schema.Types.ObjectId, ref:"groupData"}

});

module.exports = mongoose.model('incomedata',incomeSchema);