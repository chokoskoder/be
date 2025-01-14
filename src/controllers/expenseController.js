const mongoose = require('mongoose')
const dotenv = require('dotenv')

const result = dotenv.config({ path: '../../.env' });


console.log(process.env.MONGODB_URI)

const connectDB = async () =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("\n MongoDB connection failed: " , error);
        process.exit(1);
    }
}


module.exports = connectDB;


