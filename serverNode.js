var express    = require("express");
var mysql      = require('mysql');
var path       = require('path');
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

app.use(express.static(__dirname + '/public'));

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
            return res;
        });
        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
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
    app.use("/public", express.static(__dirname + "/"));
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.get("/logingRequest", function(req,res){
    console.log("login request received" );
	loginHandler(req, res);
});
app.get("/userList", function(res,req){
	userListHandler(req,res);
});

app.listen(3001);
