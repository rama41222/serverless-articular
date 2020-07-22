const mongoose = require('mongoose');
const { Schema } = mongoose;

const topicSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
    unique: true
  },
  image: {
    type: String,
    default: 'http://argauto.lv/application/modules/themes/views/default/assets/images/image-placeholder.png'
  },
  user: {
    type: String,
    ref: 'User',
    required: [true, 'User is required'],
  }
}, { strict: true, timestamps: true });

module.exports = mongoose.model('Topic', topicSchema);
