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
    }
});

//TODO : add expense shared or sum shi like that 

const users = mongoose.model("users" , userSchema);
module.exports = users;