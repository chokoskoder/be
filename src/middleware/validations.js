const { z } = require('zod')

const expenseSchema = z.object({
    expenseName : z.string().max(100).min(5),
    value : z.number().positive(),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    type : z.enum(['emergency' , 'lent' , 'travel' , 'clothes' , 'food' , 'generic']),
    status : z.enum(['paid' , 'not-paid']),
});


const validateExpense = (req, res , next) => {
    try{
        req.body  = expenseSchema.parse(req.body);
        console.log("wowzies safely parsed")
        next();
    }
    catch(err){
        next(err)
    }
};

module.exports = validateExpense