const express = require('express');
const expense = require('../models/expense.model');
const router = express()

const  validateExpense = require('../middleware/validations.js')

router.use(express.json())

router.post('/add', validateExpense ,  async (req, res) => {
    try {
        const { expenseName, value, date, type , status} = req.body;

        const addExpense = new expense({
            expenseName : expenseName,
            value : Number(value) ,
            date : new Date(date),
            type : type,
            status : status
        });

        await addExpense.save();
        // console.log(addExpense);
        res.status(201).json({
            message: "Expense added successfully",
            expense: addExpense
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to add expense",
            error: err.message
        });
    }
});


router.get('/show' , async (req,res)=>{
    try{
        const {type , minValue , maxValue , expenseName , date , status } = req.query;

        let query = {};

        // build the query based on what has been passed :
        if(type) query.type = type;
        if(expenseName) query.expenseName = new RegExp(expenseName , 'i'); //case insensitive
        if (date) query.date = new Date(date);
        if(minValue || maxValue){
            query.value = {};
            if (minValue) query.value.$gte = Number(minValue);
            if (maxValue) query.value.$lte = Number(maxValue);
        }
        if(status) query.status = status;

        const expenses = await expense.find(query)
        // .sort({date : 1});
        // .limit(req.query.limit ? Number(req.query.limit) : 50);  understand and then implement 
        res.status(200).send({message : expenses});




    }
    catch(err){
        res.status(500).send({message : "error occured while retrieving" , error : err.message});
    }
})
//TODO : understand and write  logic for a get route where you can take any parameter and then return the expenses(s) that fullfil it --> DONE
//and i just realised that all the below code will be done using the above logic so lets practice right now --> feels that this should be much easier now 

//how do i enter "not paid " , while also maintaining the space in between the two words?
//do i even need to enter not paid ? should i add this in validations ? that the parameter passed here is pakka se pakka not paid becuase then we can 

//lets change this code to write something that will help you update anything ?
//how difficult would it be ?
router.put('/update/:expenseName' , async (req,res)=>{
    //TODO : update expenses
    try{
        let query = {};
        query.expenseName = req.params.expenseName;
        console.log(query.expenseName);

        const updateDocument = {
            $set:{
                status : 'paid',

            },
        }
        const result = await expense.updateOne(query ,updateDocument)

        const data = await expense.findOne({expenseName : query.expenseName})

        res.status(200).send({message : "successfully done " ,  data});

       


    }
    catch(err){
        res.status(500).send({message : "error occured while updating" , error : err.message});
    }

})
//i wish to create a way to ask the user if he is sure about deleting the particular expense or not ? FRONTEND will be used here i guess
router.delete('/delete' , (req , res)=>{
    //TODO ; delete expenses 

})

module.exports = router;