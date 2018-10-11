var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
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
 
// // add some dummy data:
let dummyuser= new User({
    fullName:"Idan Zimilis",  
    password:"12345M",
    age:21,
    gender:"male",
    phone:"0544726500",
    email:"idan@gmail.com",
    smoker:true,
    alcohol:true,
    pets:false, //name + num of pets
    proffession:"DJ",
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
    photo: "https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.0-9/36401_134579523226709_5135185_n.jpg?_nc_cat=104&_nc_ht=scontent.fsdv3-1.fna&oh=9a5d50f192fc9b072055b64c6035c45f&oe=5C555C51",
    aboutMe:"i like hats", // free text with tips: what kind of roomate are you, what are you looking for in a roomate
    tvShows:"totally spies",
    hangout:"clubs",
    music:"dj music",
    matches:[]
});
dummyuser.save()

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
  console.log( NewUser);
  NewUser.save(function(err,data) {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log(data)
      res.status(201).send(data);

    }
  })
});

app.get('/users/:password/:fullname', function (req, res) {
  const password = req.params.password;
  const fullname = req.params.fullname;
  User.find({fullName: fullname,password:password} ,function (err,user) {
    if (err) { res.status(500).send(err) }
    else { res.status(201).send(user) }
  })
});

app.post('/users/:UserId/matches', function (req, res) {
  const userId = req.params.UserId;
  const newmatch= req.body;

  console.log(newmatch)
  User.findByIdAndUpdate( userId, { $push: {matches: newmatch}}, { "new": true }, function (err,user) {
    if (err) { res.status(500).send(err) }
    else { res.status(201).send(user.matches[user.matches.length - 1]) }
  })
});

app.get(`/users/:UserId/matches`, function (req, res) {
  const  userId = req.params.UserId;
  User.findById(userId,{matches:true}).populate('offeree offerer').exec(function(err,user){
    if (err) { res.status(500).send(err) }
    else { 
      res.send(user)
     }
  })
});



app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
