// middleware/auth.js
const jwt = require('jsonwebtoken');
const Property = require('../models/Property');

exports.auth = function (req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, 'rentify@123sudhir');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};
exports.checkOwnership = async (req, res, next) => {
    const { id } = req.params;
    try {
      const property = await Property.findById(id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      if (property.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Permission denied' });
      }
  
      req.property = property; // Attach property to request object for later use
      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
