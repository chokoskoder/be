const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName :{
        type : String,
        required : true
    },
    userExpenditure : {
        type : Number,
        default : 0,
        required : true
    },
    userExpenses : {
        type : Number,
        default : 0,
        required : true
    },
    userJoiningDate : {
        type : Date,
        //if you want to make sure that only a particular value is bein passed , use a validation middleware;
        default : Date.now(),
        required : true
    },
    refreshToken : String,
    email : {
        type : String,
        required : true,
        lowercase : true ,
        trim : true ,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
    }
});

//TODO : add expense shared or sum shi like that
// // --> will need to learn mongodb aggreagtion ,
// hopefully 16th jan night
//TODO : BEFORE launching the app again make sure to update 
//register user route 

const users = mongoose.model("users" , userSchema);
module.exports = users;