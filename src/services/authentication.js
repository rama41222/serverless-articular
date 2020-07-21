const jwt = require('jsonwebtoken');
const User = require('./../users/model');
const {config, response, messages} = require('./../lib');
const { listOne } = require('./../users/operations');

const authentication = async (req, res, next) => {
  const headerToken = req.headers.authorization;
  const token = headerToken ? headerToken.split(' ')[1] : '';
  let decoded = '';
  
  if (!token) {
    req.authenticated = false;
    return res.status(401).send(response(messages.error.user.unauthorized, null, 401 ));
  }
  
  try {
    decoded = await jwt.verify(token, config.jwt.secret, config.jwt.exp);
  } catch (e) {
    req.authenticated = false;
    return res.status(401).send(response(e.message, null, 401))
  }
  
  if (!decoded) {
    req.authenticated = false;
    return res.status(401).send(response( messages.error.user.unauthorized, null , 401))
  }
  
  let dbUser = await listOne(decoded.id);
  dbUser = dbUser.toObject();
  if(!dbUser) return res.status(401).send(response( messages.error.user.invalid, ));
  const permission = { admin: false };
  if (dbUser && dbUser.role === 'admin') permission.admin = true;
  req.authenticated = true;
  dbUser.password = null;
  req.user = dbUser;
  req.permission = permission;
  await next();
};

module.exports = authentication;
