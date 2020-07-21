const { response, messages } = require('./../lib');
const { list } = require('./operations');

const status = async(req, res) => {
  res.status(200).json(response(messages.success.general, {}, 200));
};

const login = async( req, res) => {

};

const register = async (req, res) => {

};

const update = async (req, res) => {

};

const profile = async(req, res) => {

};

module.exports = {
  status,
  login,
  register,
  update,
  profile
};
