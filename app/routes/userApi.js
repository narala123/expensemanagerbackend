var User = require('../models/userSchema');
var jwt = require('../../node_modules/jsonwebtoken');
var mongoose = require('mongoose');

function CreateToken(user) {
    return jwt.sign({
        id: user._id.toString(),
        mobile: user.mobile,

    }, "asdfdsf")
}

module.exports = function (app, express) {
    var api = express.Router();

    api.post('/saveData', function (req, res) {
        var otpno = getRandomInt(999, 10000);
        console.log(otpno);

        User.findOne({ mobile:req.body.mobile }, function (error, result) {
            var person;
            if (error) {
                console.trace(error);
            } else if (result) {
                person = result;
                person.otp = otpno;
            } else {
                person = new User({
                    mobile: req.body.mobile,
                    otp: otpno,
                });
            }

            person.save(function (err, result) {
                if (err) {
                    console.log(err);
                }
                console.log(result.otp);
                res.json({success: true, message: "User logged in", key: "", id: result._id,no:result.mobile});
                //res.send(result) to compare with mobile nember use schema(mobilenember) instead of _id;
            });
        });

    });
    api.post('/byotpid', function (req, res) {
        console.log(req.body);
        User.findOne({_id: req.body.userId, otp: req.body.otpno}, function (err, result) {
            // console.log(token);
            if (err) {
                res.send(err);

            }
            else if (result) {
                var token = CreateToken(result);
                console.log(token);
                res.json({success: true, tokenId: token, message: "otp verified"});
                console.log(result);
            }
            else {
                res.json({success: false, message: "otp not verified", key: ""})
            }
            // res.json({success: true, message: "User logged in", key: ""})
        });
    });

    return api;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
