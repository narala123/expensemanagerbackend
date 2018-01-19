/**
 * Created by nikhi on 3/21/2017.
 */
var GroupName = require('../models/groupSchema');
var User = require('../models/userSchema');
var mongoose = require('mongoose');
var groupRoutes = require('../configs/routes');

module.exports = function (app, express) {
    var api = express.Router();
    api.use(groupRoutes.isLoggedIn);

    api.post('/groupData', function (req, res) {
        console.log(req.body);
        var groupData = new GroupName({
            groupName: req.body.groupname,
            createdBy:req.userData.id
        });
        groupData.save(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.json({success: true, message: "User Group result", key: "", groupname:result.groupName, groupId:result._id});
            }
        });

    });

    api.post('/groupDetailes', function (req, res) {
        console.log(req.body);
        User.findOne({mobile: req.body.mobile}, function (err, result) {
            if (err) {
                console.trace(err);
                return;

            } else if (result) {

                GroupName.findOne({_id: req.body.groupId}, function (err, groupSchema) {
                    if (err) {
                        console.trace(err);
                        return;
                    } else {
                        groupSchema.groupUsers.push({
                            regMobileNO: req.body.mobile,
                            groupUserName: req.body.name,
                            userId: req.body.id
                        });

                        groupSchema.save(function (err, result) {
                            if (err) {
                                console.trace(err);
                                return;
                            } else {
                                console.log(result);
                                res.json({
                                    success: true,
                                    message: "User Group result",
                                    key: "",
                                    usersList:result
                                })
                            }
                        })
                    }
                });

            } else {
                var newUser = new User({
                    mobile: req.body.mobile
                });

                newUser.save(function (err, newUser) {
                    if (err) {
                        console.trace(err);
                        return;
                    } else {
                        GroupName.findOne({ _id:req.body.groupId }, function (err, groupSchema) {
                            if (err) {
                                console.trace(err);
                                return;
                            } else {
                                groupSchema.groupUsers.push({
                                    groupUserName: req.body.name,
                                    regMobileNO: newUser.mobile,
                                    userId:newUser.id,

                                });

                                groupSchema.save(function (err,result) {
                                    if (err) {
                                        console.trace(err);
                                        return;
                                    } else {
                                        res.json({
                                            success: true,
                                            message: "User Group result",
                                            key: "",
                                            usersList:result});
                                    }
                                })
                            }
                        });
                    }
                })
            }
        })
    });
    api.get('/groupNames',function(req,res){
        GroupName.find({createdBy:req.userData.id},function(err, data){
            if(err){
                console.log(err);
            }else{
                if(data.length != 0 ){

                    var getIncomeByIds = [];

                    for ( var i =0; i < data.length; i++ ){
                        getIncomeByIds.push(data[i]._id);
                    }

                    res.json({success: true, message: "User Group list", groupData:data});
                } else {
                    res.json({success: false, message: "User Group list", groupData: 0});
                }
            }
        });
    });
    api.get('/groupUsers',function(req,res){
        console.log(req.body);
        GroupName.findOne({"groupUsers.userId":req.body.groupId},function(err,result){
            if(err){
                console.log(err);
            }else{

                res.json({success: true,message: "User team list",key: "",result:result}) ;
                console.log(result);
            }
        });

    });

    return api;
}