const { response, messages } = require('./../lib');
const { hasUser, create, listByEmail, auth, update } = require('./operations');

const status = async(req, res) => {
  res.status(200).json(response(messages.success.general, {}, 200));
};

const login = async( req, res) => {
  const user = req.body;
  const dbUser = await listByEmail(user.email);
  if(!dbUser) {
    return res.status(400).json(response(messages.error.user.not_found));
  }
  const data = await auth(user, dbUser);
  res.status(200).json(data);
};

const register = async (req, res) => {
  const { email } = req.body;
  const hasUser = await hasUser(email);
  
  if (hasUser) {
    return res.status(400).json(response(messages.error.user.duplicate));
  }
  
  const user = await create(req.body);
  
  if(!user) {
    return res.status(400).json(response(messages.error.user.registration));
  }
  res.status(201).json(response(messages.success.register, user));
};

const change = async (req, res) => {
  const user = req.body;
  const { admin } = req.permission;
  const updated = await update(req.user.id, user, admin);
  if(!updated) {
    return res.status(201).json(response(messages.error.user.update));
  }
  res.status(200).json(response(messages.success.update, updated));
};

const profile = async(req, res) => {
  const { user } = req;
  delete user.password;
  res.status(200).json(response(messages.success.general, user ));
};

module.exports = {
  status,
  login,
  register,
  change,
  profile
};
