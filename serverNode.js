// http://expressjs.com/en/api.html
// https://codeforgeek.com/2014/09/handle-get-post-request-express-4/

var express    = require("express");
var bodyParser = require("body-parser");
var mysql      = require('mysql');
var path       = require('path');
var app        =  express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'pi',
  password : 'pi',
  database : 'vids'
});
/*
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ...");    
    } else {
        console.log("Error connecting database ..."+ err);    
    }
});

app.get("/",function(req,res){
    console.log("home login");
    app.use("/public", express.static(__dirname + "/"));
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/userList", function(req, res){
    console.log("getting users list");
	connection.query("select * from clientele",function(err,rows){
        console.log("query sent "+ JSON.stringify(rows));
        if(!err) {
           console.log(req.body);
           res.send(rows);
        }           
    });
    connection.on('error', function(err) { 
        console.log("Error connection");
    });
});

*/
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'pi',
    password : 'pi',
    database : 'vids',
    debug    :  false
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// HANDLERS
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// login: parameter is the user credential
var loginHandler = function (req,res) {
    var queryStr = "SELECT * FROM clientele WHERE username='"+ req.query.username+"' AND motdepasse='"+req.query.passwrd+"'";
    coreHandler (req, res, queryStr);
};
// get the list of all users
var userListHandler = function (req,res){
    var queryStr = "select * from clientele";
    coreHandler (req, res, queryStr);
};
//
// RETRIEVE IMAGES
// 
var imagesHandler = function(req, res){
    var queryStr = "select * from security";
    if(typeof req.params.fromDate !== 'undefined' &&  typeof req.params.toDate !== 'undefined'){
        queryStr += "where time_stamp between str_to_date("+fromDate+") and str_to_date("+toDate+")";
    }
    
    coreHandler (req, res, queryStr);
};
//
// CORE HANDLER
//
var coreHandler = function(req, res, queryStr){
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        console.log('connected as id ' + connection.threadId + " : "+ req.query.username);
        console.log('Query: '+ queryStr);
        connection.query(queryStr,function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            } else{
                console.log("Hooo");
                res.json({"code" : 202, "status" : "No data found"});
            }          
        });
        connection.on('error', function(err) { 
            console.log("Error connection");
              res.json({"code" : 100, "status" : "Error in connection database"});    
        });
    });
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ROUTING
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get("/",function(req,res){
    console.log("POOL home login");
    app.use("/public", express.static(__dirname + "/"));
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.get("/logingRequest", function(req,res){
    console.log("/logingRequest" );
    req.accepts('application/json');
	loginHandler(req, res);
    console.log("done with the current login request");
});
app.get("/userList", function(req, res){
	console.log("/userList" );
    req.accepts('application/json');
    userListHandler(req,res);
    //res.end("yes");
});
app.get("/images", function(req, res){
    console.log("/userList" );
    req.accepts('application/json');
    imagesHandler(req,res);
    //res.end("yes");
});
app.get("/images/:fromDate", function(req, res){
    console.log("/images/..." + req.params.fromDate );
    imagesHandler(req,res);
})



app.listen(3000);
