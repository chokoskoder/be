const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    expenseName : {
        type : String , 
        require : true
    },
    value : {
        type : Number,
        require : true,
    },
    date : {
        type : Date,
        require : true,
        default : Date.now()
    },
    type : {
        type : String,
        default : 'generic',
        enum : ['emergency' , 'lent' , 'travel' , 'clothes' , 'food' , 'generic']
    },
    status : {
        type : String,
        requre : true,
        default : 'paid',
        enum : ['not-paid' , 'paid']
        
    }
})

const expense = mongoose.model("expenses" , expenseSchema)

module.exports = expense;