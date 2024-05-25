// controllers/propertyController.js
const Property = require('../models/Property');

exports.addProperty = async (req, res) => {
  try {
    console.log(req.user);
    const property = new Property({ ...req.body, owner: req.user.id });
    await property.save();
    res.status(201).send({ status: true, property });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

exports.getPropertiesSeller = async (req, res) => {
    try {
      const properties = await Property.find({ owner: req.user.id }).populate('owner', 'firstName lastName');
      const updatedProperties =  properties.map((property) => {
          const propertyObject = property.toObject();
          propertyObject.like = property.likes.includes(req.user.id)
          propertyObject.intrested = property.interestedUsers.includes(req.user.id)
          return propertyObject;
      });
      res.send(updatedProperties);
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  };
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'firstName lastName');
    const updatedProperties =  properties.map((property) => {
        const propertyObject = property.toObject();
        propertyObject.like = property.likes.includes(req.user.id)
        propertyObject.intrested = property.interestedUsers.includes(req.user.id)
        return propertyObject;
    });
    res.send(updatedProperties);
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!property) {
      return res.status(404).send({ status: false, message: 'Property not found' });
    }
    res.send({ status: true, property });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!property) {
      return res.status(404).send({ status: false, message: 'Property not found' });
    }
    res.send({ status: true, message: 'Property deleted' });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

exports.likeProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).send({ status: false, message: 'Property not found' });
    }
    if (!property.likes.includes(req.user.id)) {
      property.likes.push(req.user.id);
      await property.save();
    }
    res.send({ status: true, likes: property.likes.length });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

exports.interestedInProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).send({ status: false, message: 'Property not found' });
    }
    if (!property.interestedUsers.includes(req.user.id)) {
      property.interestedUsers.push(req.user.id);
      await property.save();
    }
    res.send({ status: true, interestedUsers: property.interestedUsers.length });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};
exports.interestedInPropertyUser = async (req, res) => {
   
        try {
          const property = await Property.findById(req.params.id).populate('interestedUsers');
          res.json(property.interestedUsers);
        } catch (error) {
          res.status(500).json({ error: 'Server error' });
        }
  
      
  };
