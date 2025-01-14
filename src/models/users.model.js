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
    }
});

//TODO : add expense shared or sum shi like that 

const users = mongoose.model("users" , userSchema);
module.exports = users;