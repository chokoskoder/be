const express = require('express');
const dotenv = require('dotenv');
const expenses = require('./routes/expense.js');
const connectDB = require('./controllers/expenseController.js')
const users = require('./routes/Users.js');
const result = dotenv.config({ path: '.env' });

const app = express()

const port = process.env.PORT;


//TODO : get request , post request , put request , delete request 
// for now all of this to be done on the local machine ?? then i cant deploy it fuck ho gaya ye toh but no 

connectDB()
.then()
.catch((error) =>{
    console.log(error);
})



app.get('/' , (req , res)=>{
    console.log("Hello this server works fine")
    res.status(500).send({message : "wowzies this works UPDATE THE ROUTE"  })
})

try {
app.use('/expense' , expenses)
console.log("working")
} catch (error) {
    console.log(error)
}


try{
    app.use('/user' , users)
    console.log("working");
}
catch(err){
    console.log("hi")
    console.log(err);
}
app.listen(port)
