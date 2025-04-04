const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect ;





// const protect = (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({ error: 'Authentication required' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//     req.user = decoded; // Attach user info to request
    
//     // Optional: Check user roles/permissions
//     if (decoded.role !== 'admin') {
//       return res.status(403).json({ error: 'Permission denied' });
//     }

//     next(); // Proceed to the next middleware or route
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// module.exports = protect;