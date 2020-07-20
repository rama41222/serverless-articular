const { response, messages } = require('./../lib');

const status = async(req, res) => {
  res.status(200).json(response(messages.success.general, {route: 'users'}));
};

module.exports = {
  status,
};
