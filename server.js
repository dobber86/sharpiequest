var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getConnection() {
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mysql',
      database: 'sharpiequest'
    });
    return connection;
};

app.listen(3001, function () {
    console.log('Sharpiequest app is started on localhost:3001');
});

app.use(express.static('public'));

// SIGN IN INTO DATABASE
app.post('/signin', function (req, res) {
    console.log("in sign in");
    var connection = getConnection();
    connection.connect();
    
    var newSignIn = {
        id: 0, 
        username: req.body.username, 
        password: req.body.password,
        hp: req.body.hp,
        maxhp: req.body.maxhp,
        mp: req.body.mp,
        maxmp: req.body.maxmp,
        power: req.body.power,
        resistance: req.body.resistance,
        accuracy: req.body.accuracy,
        insight: req.body.insight,
        specialpower: req.body.specialpower,
        xp: req.body.xp,
        level: req.body.level,
        money: req.body.money
    };

    var sql = 'INSERT INTO players SET ?';
  
    var query = connection.query(sql, newSignIn, function (err, result) {
      if(err) {
          console.log("foutje in sigin in" + err);
      }
        console.log("added " +  newSignIn);
      res.status(200).end();
    });
    connection.end();
});

// CHECKING USERNAME AVAILABILITY IN DATABASE DURING SIGN IN
app.post('/checkUsername', function(req, res) {
    console.log("In username check");
    var connection = getConnection();
    connection.connect();

    var username = req.body.username;
    var sql = 'SELECT * FROM players WHERE username = ?';

    connection.query(sql, username, function (err, result) {
        
        if(err) {
            console.log("Something went wrong in checking username: " + err);
        } else {
            if (result.length >= 1) {
                res.status(200).end();
                console.log(username + " already in database!");
            } else {
                res.status(204).end();
                console.log(username + " is new to database!");
            }
        }
    });
    connection.end();
});

// FETCHING LOGIN ENTRY
app.post('/fetch', function(req, res) {
    console.log("In login check");
    var connection = getConnection();
    connection.connect();

    var username = req.body.username;
    var password = req.body.password;
    var sql = 'SELECT * FROM players WHERE username = ? AND password = ?';

    connection.query(sql, [username, password], function (err, rows, fields) {
        
        if(!err) {
            console.log("Logged In: " + username + ". Pw: " + password + ". " + rows);
            if (rows.length == "1") {
                res.send(JSON.stringify(rows));
                res.status(200).end();
            } else if (rows.length == "0") {
                res.status(401).end();
            } else {
                res.status(400).end();
            }
        } else {
            console.log('Error while performing Query: ' + err);
        }
    });
    connection.end();
});

// UPDATE PLAYERSTATS
app.post('/update', function (req, res) {
    console.log("in update");
    var connection = getConnection();
    connection.connect();
    
    var user = req.body.username;

    var newUpdate = {
        hp: req.body.hp,
        maxhp: req.body.maxhp,
        mp: req.body.mp,
        maxmp: req.body.maxmp,
        power: req.body.power,
        resistance: req.body.resistance,
        accuracy: req.body.accuracy,
        insight: req.body.insight,
        specialpower: req.body.specialpower,
        xp: req.body.xp,
        level: req.body.level,
        money: req.body.money
    };

    var sql = "UPDATE players SET ? WHERE username = '" + user + "'";
  
    var query = connection.query(sql, newUpdate, function (err, result) {
      if(err) {
          console.log(user + "foutje in update: " + err);
          console.log(sql);
      }
        console.log("updated " +  newUpdate);
      res.status(200).end();
    });
    connection.end();
});

// DELETE PLAYER
app.post('/delete', function (req, res) {
    console.log("in delete");
    var connection = getConnection();
    connection.connect();
    
    var user = req.body.username;

    var sql = "DELETE FROM players WHERE username = '" + user + "'";
  
    var query = connection.query(sql, function (err, result) {
      if(err) {
          console.log(user + "foutje in delete: " + err);
          console.log(sql);
      }
        console.log("Deleted " +  user);
      res.status(200).end();
    });
    connection.end();
});