/**
 * Created by nikhi on 3/8/2017.
 */
var Income = require('../models/incomeSchema');
var Expense = require('../models/expenseSchema');
var mongoose = require('mongoose');
var incomeRoutes = require('../configs/routes');
module.exports = function (app, express) {
    var api = express.Router();

    api.use(incomeRoutes.isLoggedIn);

    api.post('/getSummeryData', function (req, res) {

        var query = (req.body.dataId ? { userId:req.userData.id, teamId:req.body.dataId } : { userId:req.userData.id } ) ;
        Income.find(query).lean().exec( function (err, incomeData) {
            if (err) {
                res.send(err);
            }
            Expense.find(query).lean().exec(function (err, expensesData) {
                if (err) {
                    res.send(err);
                }
                var summery = incomeData.concat(expensesData);
                var total =0;
                summery.sort(function(a,b){
                    var date1 = new Date(a.Date);
                    var date2 = new Date(b.Date);
                    return date2<date1? -1:date2>date1? 1:0;
                })
                for(var i=0; i<summery.length; i++) {
                    if (summery[i].hasOwnProperty('Received')) {
                        total += Number(summery[i].Amount);
                        summery[i].Type = "Income";
                    }else{
                        total -= Number(summery[i].Amount);
                        summery[i].Type = "Expense";
                    }
                    summery[i].Total = total;
                }
                res.json({success: true, message: "User result", result:summery});
            });
        });
    });
    return api;

}