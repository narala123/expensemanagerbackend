/**
 * Created by nikhi on 3/2/2017.
 */
var Income = require('../models/incomeSchema');
var Expense = require('../models/expenseSchema');
var mongoose = require('mongoose');
var incomeRoutes = require('../configs/routes');
module.exports = function (app, express) {
    var api = express.Router();

    api.use(incomeRoutes.isLoggedIn);

    api.post('/incomeData', function (req, res) {
        console.log(req.body);
        var id = mongoose.Types.ObjectId(req.userData.id);
        var incomeData = new Income({
            Date: req.body.date,
            Category: req.body.categoryType,
            Amount: req.body.amount,
            Received: req.body.receiveType,
            userId:id,
            teamId:req.body.groupId,
        });
        incomeData.save(function (err, result) {
            if (err) {
                console.log(err);
            }
            res.json({success: true, message: "User result", key: "",id:result._id});
            //res.send(result);
        });

    });
    //api.get('/getIncomeData', function (req, res) {
    //    Income.find({userId:req.userData.id}).lean().exec( function (err, incomeData) {
    //       if (err) {
    //          res.send(err);
    //       }
    //        Expense.find({userId:req.userData.id}).lean().exec(function (err, expensesData) {
    //            if (err) {
    //                res.send(err);
    //            }
    //            var summery = incomeData.concat(expensesData);
    //            var total =0;
    //            summery.sort(function(a,b){
    //                var date1 = new Date(a.Date);
    //                var date2 = new Date(b.Date);
    //                return date2<date1? -1:date2>date1?1:0;
    //            })
    //            for(var i=0; i<summery.length; i++) {
    //                if (summery[i].hasOwnProperty('Received')) {
    //                    total += Number(summery[i].Amount);
    //                }else{
    //                    total -= Number(summery[i].Amount);
    //                }
    //                summery[i].Total = total;
    //            }
    //            res.json({success: true, message: "User result", result:summery});
    //        });
    //   });
    //});
    api.get('/getIncomeData', function (req, res) {
        Income.find({userId:req.userData.id}, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json({success: true, message: "User result", result:result});
        });
    });

    return api;

}