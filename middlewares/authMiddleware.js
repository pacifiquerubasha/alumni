
const jwt = require("jsonwebtoken")

const authMiddleware = async(req, res, next)=>{
    const token = req.cookies.jwt; 
    
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.clearCookie('jwt'); 
          return res.status(401).json({ msg: 'Token is not valid' });
        } else {
          req.user = decoded;
        }
      });
    }
  
    next();
}

module.exports = {authMiddleware}