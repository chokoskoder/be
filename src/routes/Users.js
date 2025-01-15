const express = require('express')
const router = express()
const user = require('../models/users.model')
// const { date } = require('zod')

router.use(express.json())


router.get('/show' , async (req, res)=>{
//TODO : gets all the users and the number of expenses they have entered 
    try{

        let query = {};
        const { name , minExpenditure , maxExpenditure  , minExpenses , maxExpenses , joiningDate} = req.query;
        if(name) query.userName  = new RegExp(name , 'i');
        if(joiningDate) query.userJoiningDate = joiningDate;
        if(minExpenditure || maxExpenditure){
            query.userExpenditure = {};
            if (minExpenditure) query.userExpenditure.$gte = Number(minExpenditure);
            if (maxExpenditure) query.userExpenditure.$lte = Number(maxExpenditure);
    
        }
        if(minExpenses|| maxExpenses){
            query.userExpenses = {};
            if (minExpenses) query.userExpenses.$gte = Number(minExpenses);
            if (maxExpenses) query.userExpenses.$lte = Number(maxExpenses);
    
        }
        
        const users = await user.find(query);
        res.status(200).send({message : " users " , users : users});
    }
    catch(err){
        res.status(500).send({msg : " an error occured while retrieving users " , error : err.message});
    }
})

router.post('/add' , async (req , res) => {
    //TODO : add users , simple 
    const {name , expenditure , expenses , joiningDate} = req.body;

    const addUser = new user({
        userName : name,
        userExpenditure : expenditure ,
        userExpenses : expenses,
        userJoiningDate : joiningDate
    })

    await addUser.save();

    res.status(200)
    .send({message : " user added successfully" , 
        user : addUser
    })
})

router.put('update' , async (req , res) => {
    //simple updating the user data 
})

module.exports  = router;

