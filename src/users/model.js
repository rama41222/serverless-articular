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
}, { strict: true, timestamps: true });

module.exports = mongoose.model('User', userSchema);
