// routes/property.js
const express = require('express');
const router = express.Router();
const {auth,checkOwnership} = require('../middleware/auth');
const {
  addProperty,
  getProperties,
  updateProperty,
  deleteProperty,
  likeProperty,
  interestedInProperty,
  interestedInPropertyUser,
  getPropertiesSeller
} = require('../controllers/propertyController');


router.post('/', auth, addProperty);
router.get('/', auth,getProperties);
router.get('/seller', auth,getPropertiesSeller);
router.get('/:id/interested-users',auth,interestedInPropertyUser)
router.put('/:id', auth,checkOwnership, updateProperty);
router.delete('/:id', auth,checkOwnership, deleteProperty);
router.post('/:id/like', auth, likeProperty);
router.post('/:id/interested', auth, interestedInProperty);

module.exports = router;
