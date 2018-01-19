/**
 * Created by nikhi on 3/2/2017.
 */
var Expense = require('../models/expenseSchema');
var mongoose = require('mongoose');
var expenseRoutes = require('../configs/routes');

module.exports = function (app, express) {
    var api = express.Router();
    api.use(expenseRoutes.isLoggedIn);

    api.post('/expenseData', function (req, res) {
        var expenseData = new Expense({
            Date: req.body.date,
            Category: req.body.categoryType,
            Amount: req.body.amount,
            Paid: req.body.paymentType,
            userId:req.userData.id,
            teamId:req.body.groupId,
        });
        expenseData.save(function (err, result) {
            if (err) {
                console.log(err);
            }
            res.json({success: true, message: "User expense result", key: "", id:result._id});
            //res.send(result);
        });
    });

    api.get('/getExpenseData', function (req, res) {
        Expense.find({userId:req.userData.id}, function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json({success: true, message: "User result", result:result});
        });
    });
    return api;
}