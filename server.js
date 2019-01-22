var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
let User = require('./models/usersModel');
const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/roomiesDB', function () {
  console.log("DB connection established!!!");
})

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// // add some dummy data:
// let dummyuser= new User({
//     fullName:"Idan Zimilis",  
//     password:"12345M",
//     age:21,
//     gender:"male",
//     phone:"0544726500",
//     email:"idan@gmail.com",
//     smoker:true,
//     alcohol:true,
//     pets:false, //name + num of pets
//     proffession:"DJ",
//     wantedLocation:"TelAviv",
//     diet:"vegetarian",
//     religion:"secular",
//     hygenicRating: 5,
//     hobbies:["swiming","tennis","piano"],
//     host:true,
//     joinedGrocery:true,
//     quietRating: 5,
//     financesRating: 5,
//     maxrent: 2000,
//     chores:["cooking","laundry"],
//     maxnumroomates:2, //number of roomates, how long 
//     allergies:"none",
//     photo: "https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.0-9/36401_134579523226709_5135185_n.jpg?_nc_cat=104&_nc_ht=scontent.fsdv3-1.fna&oh=9a5d50f192fc9b072055b64c6035c45f&oe=5C555C51",
//     aboutMe:"i like hats", // free text with tips: what kind of roomate are you, what are you looking for in a roomate
//     tvShows:"totally spies",
//     hangout:"clubs",
//     music:"dj music",
//     matches:[]
// });
// dummyuser.save()

app.put('/users/:UserId/matches/:PartnerId/status', function (req, res) {
  const userId = req.params.UserId;
  const partnerId = req.params.PartnerId;
  const status = req.body.statuss;
  User.updateMany(
    { _id: { $in: [userId, partnerId] }, 'matches.offeree': userId, 'matches.offerer': partnerId, 'matches.status': null },
    {
      $set: {
        'matches.$.status': status
      }
    },
    function (err, raw) {
      if (err) {
        console.log(err)
        res.status(404).send(err);
      }
      else {
        console.log("add status")
        console.log(raw)
        res.status(201).send(raw)
      }
    })
});


app.get('/Users/:UserId/matches/propses', function (req, res) {
  const userId = req.params.UserId;
  User.aggregate([
    { $match: { _id: { $in: [mongoose.Types.ObjectId(userId)] } } },
    {
      $addFields: {
        'matches': {
          $filter: {
            input: '$matches',
            as: "match",
            cond: {
              $and: [
                { $eq: ['$$match.status', null] },
                { $eq: ['$$match.offeree', mongoose.Types.ObjectId(userId)] }
              ]
            }
          }
        }
      }
    }
  ], function (err, user) {
    User.populate(user, { path: "matches.offerer" },
      function (err, users) {
        if (err) {
          console.log(err);
          res.status(500).send(err)
        }
        else {
          console.log(users)
          res.send(users[0].matches)
        }
      }
    )
  })

});


app.get('/Users/:UserId/matches/requests', function (req, res) {
  const userId = req.params.UserId;
  const type = req.params.type;
  User.aggregate([
    { $match: { _id: { $in: [mongoose.Types.ObjectId(userId)] } } },
    {
      $addFields: {
        'matches': {
          $filter: {
            input: '$matches',
            as: "match",
            cond: {
              $and: [
                { $eq: ['$$match.status', null] },
                { $eq: ['$$match.offerer', mongoose.Types.ObjectId(userId)] }
              ]
            }
          }
        }
      }
    }
  ], function (err, user) {
    console.log(user)
    User.populate(user, { path: "matches.offeree" },
      function (err, users) {
        if (err) {
          console.log(err);
          res.status(500).send(err)
        }
        else {

          res.send(users[0].matches)
        }
      }
    )
  })
});


app.get('/Users/:UserId/matches/roomies', function (req, res) {
  const userId = req.params.UserId;
  User.find({
    _id: { $nin: [userId] },
    matches: {
      "$elemMatch": {
        $or: [
          { "offeree": userId, "status": true },
          {"offerer": userId, "status": true}
        ]
      }
    }
  }
    , function (err, users) {
      if (err) {
        console.log(err);
        res.status(500).send(err)
      }
      else {
        console.log(users)
        res.send(users)
      }
    }

  )
});
// $and:[
//   ,
//   {
//   $or:
//     [
//       { $and: [{ 'matches.offeree': userId }, { 'matches.status': true }] },
//       { $and: [{ 'matches.offerer': userId }, { 'matches.status': true }] }
//     ]
//   }
// ]}

// .find({_id: userId},
//   {matches:{$elemMatch:{offerer: userId}}},
//   {'matches.$':1}
//     )

app.get('/users/:userId', function (req, res) {
  const userId = req.params.userId;
  User.find({ _id: { $nin: [userId] } }, function (err, users) {
    if (err) {
      res.status(500).send(err);
    }
    res.send(users);
  })
});

app.get('/users/:password/:fullname', function (req, res) {
  const password = req.params.password;
  const fullname = req.params.fullname;
  User.find({ fullName: fullname, password: password }, function (err, user) {
    if (err) { res.status(500).send(err) }
    else { res.status(201).send(user) }
  })
});

app.post('/users', function (req, res) {
  let NewUser = new User(req.body)
  console.log(NewUser);
  NewUser.save(function (err, data) {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log(data)
      res.status(201).send(data);

    }
  })
});

app.post('/users/:UserId/matches/:PartnerId', function (req, res) {
  const userId = req.params.UserId;
  const partnerId = req.params.PartnerId;
  const newmatch = req.body;
  User.updateMany(
    { _id: { $in: [userId, partnerId] } },
    { $addToSet: { matches: newmatch } },
    function (err, raw) {
      if (err) {
        res.status(404).send(err);
        console.log('The raw response from Mongo was ', raw)
      }
      else {
        console.log("add match")
        console.log(raw)
        res.status(201).send()
      }
    })
});




app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});

// app.post('/users/:UserId/matches', function (req, res) {
//   const userId = req.params.UserId;
//   User.findById( { _id:userId }).then(user => {

//     console.log(newmatch)
//     user.update({ $addToSet: {matches: newmatch}},{ new: true })
//     .then(()=>{
//       console.log("add match")
//       console.log(user)
//       res.status(201).send()
//      })
//     .catch(err => res.status(404).send(err));
//   }) 
// })



