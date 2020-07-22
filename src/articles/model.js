const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required'],
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
    required: [true, 'Topic is required']
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
    required: [true, 'User is required'],
  }
}, { strict: true, timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
