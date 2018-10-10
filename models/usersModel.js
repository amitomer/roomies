var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let matchSchema = new Schema({
    // date:Date,
    offeree:{type: Schema.Types.ObjectId, ref: 'user'},
    offerer:{type: Schema.Types.ObjectId, ref: 'user'},
    status:Boolean
});


let userSchema = new Schema({
    fullName:String,
    password:String,
    age:Number,
    gender:String,
    phone:String,
    email:String,
    smoker:Boolean,
    alcohol:Boolean,
    pets:Boolean, //name + num of pets
    proffession:String,
    wantedLocation:String,
    diet:String,
    religion:String,
    hygenicRating: Number,
    hobbies:Array,
    host:Boolean,
    joinedGrocery:Boolean,
    quietRating: Number,
    financesRating: Number,
    maxrent: Number,
    chores:Array,
    maxnumroomates:Number, //number of roomates, how long 
    allergies:String,
    photo:String,
    aboutMe:String, // free text with tips: what kind of roomate are you, what are you looking for in a roomate
    tvShows:String,
    hangout:String,
    music:String,
    matches:[matchSchema]
});

let User = mongoose.model('user', userSchema)

module.exports = User;
