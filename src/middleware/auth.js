const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookieParser')

const authenticateToken = (req , res , next) =>{
    const accessToken = req.cookies['accessToken'];

    if(!accesstoken){
        return res.status(401).send({message : "no access tokens provided"});
    }
    try {
        const decoded = jwt.verify(accessToken , process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(403).send({message : "Invalid token " , error : err.message});
    }
}