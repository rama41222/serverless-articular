const bcrypt = require('bcryptjs');
const User = require('./model');
const jwt = require('jsonwebtoken');
const { config, messages } = require('./../lib');
const  salt = bcrypt.genSaltSync(config.hash.saltRounds);


const list = async(limit = 10, skip = 0) => {
  return User.find().select({ __v: 0 }).skip(skip).limit(limit).exec();
};

const listOne = async(id) => {
  return User.findById(id).select({ __v: 0 }).exec();
};

const listByEmail = async(email) => {
  return User.findOne({ email }, { __v: 0 }).exec();
};

const hasUser = async(email) => {
  const count = await User.count({ email }).exec();
  return count > 0;
};

const create = async(user) => {
  if(user.role) delete user.role;
  user.password = await bcrypt.hashSync(user.password, salt);
  let newUser = await User.create(user);
  newUser = newUser.toObject();
  delete newUser.password;
  return newUser;
};

const auth = async(user, dbUser) => {
  const { password } = user;
  const isValid = await bcrypt.compare(password, dbUser.password).catch(e => {
    return { message: e.message, data: null };
  });
  
  if(isValid !== true) {
    return { message: messages.error.user.invalid };
  }
  dbUser = dbUser.toObject();
  delete dbUser.password;
  const tokenData = { id: dbUser._id, role: dbUser.role };
  const token = jwt.sign(tokenData, config.jwt.secret, { expiresIn: config.jwt.exp });
  return { message: messages.success.login, data: { user: dbUser, token: `bearer ${token}` }}
};

const update = async(id, user, isAdmin) => {
  const dbUser = await User.findById(id).exec();
  if(isAdmin && user.role) {
    dbUser.role = user.role;
  }
  if(user.password) {
    dbUser.password  = await bcrypt.hashSync(user.password, salt);
  }
  if(user.name) dbUser.name = user.name;
  let updatedUser = await dbUser.save();
  if(updatedUser) {
    updatedUser = updatedUser.toObject();
    delete updatedUser.password
  };
  return updatedUser ? updatedUser : null;
};


module.exports = {
  list,
  hasUser,
  listByEmail,
  listOne,
  create,
  auth,
  update
};
