var mongoose = require('mongoose');

let matchSchema = new mongoose.Schema({
    date:Date,
    offeree:[{type: Schema.Types.ObjectId, ref: 'user'}],
    offerer:[{type: Schema.Types.ObjectId, ref: 'user'}],
    status:Boolean
});

let userSchema = new mongoose.Schema({
    fullName:String,
    password:String,
    age:Number,
    gender:String,
    phone:String,
    email:String,
    relStatus:String,
    smoker:Boolean,
    alcohol:Boolean,
    pets:Object, //name + num of pets
    proffession:String,
    wantedLocation:String,
    diet:String,
    religion:String,
    hygenicRating: Number,
    hobbies:Array,
    host:Boolean,
    jointGrocery:Boolean,
    quietRating: Number,
    financesRating: Number,
    chores:String,
    roomates:Object, //number of roomates, how long 
    allergies:String,
    photo:String,
    aboutMe:String, // free text with tips: what kind of roomate are you, what are you looking for in a roomate
    tvShows:String,
    hangout:String,
    music:String,
    //matches:[]
});

let User = mongoose.model('user', userSchema)

module.exports = User;
