const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
}, { strict: true, timestamps: true });

module.exports = mongoose.model('User', userSchema);
