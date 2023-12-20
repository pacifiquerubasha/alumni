
const jwt = require("jsonwebtoken")

const authMiddleware = async(req, res, next)=>{
    const token = req.headers['authorization']?.split(" ")[1]; 
    
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(req.headers) 
          return res.status(401).json({ message: 'Token is not valid' });
        } else {
          req.user = decoded;
        }
      });
    }

    else{
      return res.status(401).json({ message: 'Please log in' });
    }
  
    next();
}

const adminMiddleware = async(req, res, next)=>{
  const token = req.headers['authorization']?.split(" ")[1]; 
  
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie('jwt'); 
        return res.status(401).json({ message: 'Token is not valid' });
      } else {
        if(decoded.role !== "manager"){
          console.log(decoded)
          return res.status(401).json({ message: 'You are not authorized to perform this action' });
        }
        req.user = decoded;
      }
    });
  }

  else{
    return res.status(401).json({ message: 'Please log in' });
  }

  next();
}

module.exports = {authMiddleware, adminMiddleware}