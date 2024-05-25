const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  password: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
