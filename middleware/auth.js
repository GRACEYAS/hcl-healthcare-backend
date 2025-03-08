const jwt = require('jsonwebtoken')
const config = require("config")
const auth  = async(req,res,next)=>
{
 const token = req.headers["x-access-token"]
console.log("token",req.headers)
  if (!token) {
    return res.status(403).json({error:"A token is required for authentication"});
  }
  try {
    const decoded = jwt.verify(token, config.get("TOKEN_KEY"));
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({error:"Invalid Token"});
  }
  return next();
}
module.exports = auth;