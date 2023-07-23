const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(data){
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1d"});
}


function verifyAccessToken(req, res, next){
    const token = req.headers.authorization || req.query.token || req.cookies.token;
    
    if(!token){
        return res.status(401).json({error:"Accés réfuser,"})
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        //Passez au middleware ou au gestionnaire de route suivant.
        next();
      } catch (error) {
        log(error);
        return res.status(401).json({ error: 'Token incorrect' });
      }
}

module.exports = {generateAccessToken, verifyAccessToken};