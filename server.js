var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let  User = require('./models/usersModel');
const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/roomiesDB', function() {
  console.log("DB connection established!!!");
})

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
// add some dummy data:
let dummyuser= new User({
    fullName:"may",  
    password:"12345M",
    age:20,
    gender:"female",
    phone:"0544726500",
    email:"mayaronov@gmail.com",
    smoker:true,
    alcohol:true,
    pets:true, //name + num of pets
    proffession:"student",
    wantedLocation:"TelAviv",
    diet:"vegetarian",
    religion:"secular",
    hygenicRating: 5,
    hobbies:["swiming","tennis","piano"],
    host:true,
    joinedGrocery:true,
    quietRating: 5,
    financesRating: 5,
    maxrent: 2000,
    chores:["cooking","laundry"],
    maxnumroomates:2, //number of roomates, how long 
    allergies:"none",
    photo:String,
    aboutMe:"hi my name is may and i'm a Roomie user", // free text with tips: what kind of roomate are you, what are you looking for in a roomate
    tvShows:"blah",
    hangout:"bars,resturant",
    music:"pop,rock",
    matches:[]
});

app.get('/users', function (req, res) {
  User.find({}, function (err,users) {
    if (err) {
      res.status(500).send(err);
    }
    res.send(users);
  })
});

app.post('/users', function (req, res) {
  let NewUser = new User(req.body)
  NewUser.save(function(err,data) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(data);
    }
  })
});







app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
