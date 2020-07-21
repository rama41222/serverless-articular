const mongoose = require('mongoose');

const { Schema } = mongoose;

const topicSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  }
}, { strict: true, timestamps: true });

module.exports = mongoose.model('Topic', topicSchema);
