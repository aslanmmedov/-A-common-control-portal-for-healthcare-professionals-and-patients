const jwt = require("jsonwebtoken");
require('dotenv').config()

const authMiddleware = (roles) => {
    return async (req, res, next) => {
      try {
        let token = req.headers.authorization;
        if (!token) {
          return res
            .status(401)
            .json({ message: "Token must be provided!" });
        }
  
        if (token && token.startsWith("Bearer")) {
          token = token.split(" ")[1];
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!roles.includes(decoded.role)) {
          return res.status(403).json({ message: "you don't have permission to acces" });
        }
  
        next();
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  };
  
module.exports = authMiddleware;