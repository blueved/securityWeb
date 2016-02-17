var express    = require("express");
var mysql      = require('mysql');
/*
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'pi',
  password : 'pi',
  database : 'vids'
});
var app = express();

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ...");    
    } else {
        console.log("Error connecting database ..."+ err);    
    }
});

app.get("/",function(req,res){
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

app.listen(3000);
*/
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// run this server: node serverNode.js
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();

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
var loginHandler = function loginHandler(req,res) {
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        console.log('connected as id ' + connection.threadId);
        var selectQuery = "select * from clientele where username = " + req.query.username;
        connection.query(selectQuery,function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });
        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
};
// add new user to db
va insertUserHandler = function  (req, res){
	
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
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });
        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ROUTING
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get("/",function(req,res){
	res.send("index.html");
});
app.get("/logingRequest", function(req,res){
	loginHandler(req, res);
});
app.get("/userList", function(res,req){
	userListHandler(req,res);
});

app.listen(3000);
