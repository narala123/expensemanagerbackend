/**
 * Created by nikhi on 3/2/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = new Schema({
    Date:Date,
    Category:String,
    Amount : Number,
    Paid : String,
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"ExpManDbs"},
    teamId:{type:mongoose.Schema.Types.ObjectId,ref:"groupData"}

});

module.exports = mongoose.model('expensedata',expenseSchema);