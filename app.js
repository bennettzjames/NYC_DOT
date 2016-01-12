var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
// var mongoUrl = 'mongodb://localhost:27017/TYPE DB HERE';

// Configuration
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
app.use(methodOverride('_method'));

// DB setup
var db;
MongoClient.connect(mongoUrl, function(err, database) {
  if (err) {
    console.log(err);
  }
  console.log("Connected correctly to server");
  db = database;
  process.on('exit', db.close);
});

app.listen(process.env.PORT || 3000);