// authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado' });
  }

  jwt.verify(token, 'secreto', (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
