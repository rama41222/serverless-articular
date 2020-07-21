const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  image: {
    type: String,
    default: 'https://getuikit.com/v2/docs/images/placeholder_600x400.svg'
  },
  content: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: {
    type: Array,
    default: []
  },
  topicId: {
    type: String,
    ref: 'Topic',
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
  }
}, { strict: true, timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
