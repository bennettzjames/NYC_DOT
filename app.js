var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = 'mongodb://localhost:27017/nycdotDB';

var events = require('./events.json')
var calendars = require('./calendars.json')

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

  // Search the events & calendars collections and return all results. If the collections are empty, seed with events.json and calendars.json
  db.collection('events').find({}).toArray(function(err,result){
    if (result.length===0){
      db.collection('events').insert(events)
    }
  }) 
  db.collection('calendars').find({}).toArray(function(err,result){
    if (result.length===0){
      db.collection('calendars').insert(calendars)
    }
  }) 

  process.on('exit', db.close);
});

app.get('/', function(req, res){
  res.render('index');
})





app.listen(process.env.PORT || 3000);