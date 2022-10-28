
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next)
{
    const token = req.body.token || req.query.token || req.headers["x-user-auth-token"];

    if(!token)
    {
        return res.status(401).send("Access Denied!! No token provided");
    }

    try{ 
        const decoded = jwt.verify(token , config.get('jwtPrivatekey'));
        req.user= decoded;
        next();
    }
    catch(exp)
    {
        console.log(exp.message);
        res.status(400).send("Invalid token povided!!");
    }
}