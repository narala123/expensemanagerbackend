/**
 * Created by nikhi on 3/21/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
    groupName : String,
    createdBy: {type:mongoose.Schema.Types.ObjectId,ref:"ExpManDb"},
    groupUsers:[{
        groupUserName:String,
        regMobileNO : Number,
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"ExpManDb"}
    }]
});
module.exports = mongoose.model('groupData',groupSchema);