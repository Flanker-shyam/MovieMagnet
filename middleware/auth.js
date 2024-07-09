
const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req,res,next)=>
{
    const token = req.headers["x-user-auth-token"];

    if(!token)
    {
        return res.status(401).send("Access Denied!! No token provided");
    }

    try{ 
        const jwt_key = process.env.JWT_KEY
        const decoded = jwt.verify(token , jwt_key);
        req.user= decoded;
        next();
    }
    catch(exp)
    {
        console.log(exp.message);
        res.status(400).send("Invalid token povided!!");
    }
}