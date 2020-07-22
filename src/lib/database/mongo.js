const mongoose = require('mongoose');
const { mongo } = require('./../config');

mongoose.Promise = global.Promise;

function connect() {
  mongoose.connect(mongo.url,  { useNewUrlParser: true,  useUnifiedTopology: true  });
  mongoose.connection.once('open', () => {
    console.log(`mongodb running @ ${mongo.url}`);
  }).on('error', e => {
    console.error(e);
  });
}

module.exports = {
  connect
};
