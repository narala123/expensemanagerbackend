var express=require('express');
var bodyParser=require('body-Parser');
var mongoose=require('mongoose');

var app=new express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", " * ");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
    if(req.method == "OPTIONS"){
        res.statusCode = 204;
        return res.send();
    }else{
        return next();
    }

});



    var loginApi = require('./app/routes/userApi')(app, express);
    app.use('/loginApi', loginApi);

    var incomeApi = require('./app/routes/incomeApi')(app, express);
    app.use('/incomeApi', incomeApi);

    var expenseApi = require('./app/routes/expenseApi')(app, express);
    app.use('/expenseApi', expenseApi);

    var summeryApi = require('./app/routes/summeryApi')(app,express);
    app.use('/summeryApi',summeryApi);

    var groupApi = require('./app/routes/groupApi')(app,express);
    app.use('/groupApi',groupApi);


// app.use(express.static(__dirname+"/Public"));
// app.get('*',function(req,res){
    // res.sendFile(__dirname+"/Public/index.html");
// });

mongoose.connect('mongodb://localhost/ExpenseManagerData',function(err,result){
    if(err){
       console.log(err);
  }
   console.log("database connected");
});
app.listen(3000,function(err,result){

    if(err){
        console.log(err);
    }
    console.log("i am listning at 3000");


});