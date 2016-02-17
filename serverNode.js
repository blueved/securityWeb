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
    connection.query('SELECT * from security LIMIT 2', function(err, rows, fields) {
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

// run this server: node serverNode.js

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

function handle_database(req,res) {
    
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
}

app.get("/",function(req,res){-
        handle_database(req,res);
});

app.listen(3000);
