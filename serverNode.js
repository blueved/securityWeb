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

/*
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
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        console.log('connected as id ' + connection.threadId + " : "+ req.query.username);
        var selectQuery = "SELECT * FROM clientele WHERE username='"+ req.query.username+"' AND motdepasse='"+req.query.passwrd+"'";
        console.log(selectQuery);
        connection.query(selectQuery,function(err,rows){
            connection.release();
            if(!err) {
                console.log("found a couple of rows "+  rows);
                res.json(rows);
                
            }  else{
                console.log("Hooo");
                res.json({"code" : 202, "status" : "No data found"});
            }
            //return res;
        });
        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});   
        });
  });
};
// add new user to db
var insertUserHandler = function  (req, res){
	
};
// get the list of all users
var userListHandler = function (req,res){
	pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        console.log('connected as id ' + connection.threadId);
        connection.query("select * from clientele",function(err,rows){
            console.log("query sent "+ err + " : " + rows);
            connection.release();
            if(!err) {
                res.json(rows);
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
    console.log("home login");
    app.use("/public", express.static(__dirname + "/"));
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/login',function(req,res){
  var user_name=req.body.user;
  var password=req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});
app.get("/logingRequest", function(req,res){
    console.log("login request received" );
    req.accepts('application/json')
	loginHandler(req, res);
    console.log("done with the current login request");
});
app.get("/userList", function(res,req){
	userListHandler(req,res);
});
app.get("/test", function(res,req){
    connection.query('SELECT * from clientele', function(err, rows, fields) {
        connection.end();
        if (!err){
            console.log('The solution is: ', rows);
            res.json({"code" : 100, "status" : "Success"});
        }
        else{
            console.log('Error while performing Query.');
            res.json({"code" : 100, "status" : "Error in connection database"});
        }
    });
});
*/

app.listen(3000);
