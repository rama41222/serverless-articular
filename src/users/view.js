const { response, messages } = require('./../lib');
const { list } = require('./operations');

const status = async(req, res) => {
  res.status(200).json(response(messages.success.general, {}, 200));
};


module.exports = {
  status,
};
