const { z } = require('zod')

const expenseSchema = z.object({
    expenseName : z.string().max(100),
    value : z.number().positive(),
    date : z.string.datetime(),
    type : z.string().enum(['emergency' , 'lent' , 'travel' , 'clothes' , 'food' , 'generic']),
    status : z.string().enum(['paid' , 'not paid']),
});

const requiredExpenseSchema = expenseSchema.required();

