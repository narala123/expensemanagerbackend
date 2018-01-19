/**
 * Created by nikhi on 3/6/2017.
 */
var jsonToken = require('jsonwebtoken');
function decryptToken(tokenValue){
    return tokenValue?jsonToken.verify(tokenValue,"asdfdsf"):null;
}

module.exports.isLoggedIn = function(req,res,next){
    var token = req.headers['x-access-token'];

    if(token){
        var user = decryptToken(token);
        if(user){
            req.userData = user;
            //console.log(req.userData);
            next();
        }
        else
            res.status(401).send({success:false,message:"Invalid token"});
    }else {
        //next();
        res.status(401).send({success:false,message:"No token found"});
    }
};