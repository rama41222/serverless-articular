const {config, response, messages} = require('./../lib');

const admin = async (req, res, next) => {
  const { admin } = req.permission || {};
  if(!admin || !req.authenticated) {
    return res.status(401).send(response( messages.error.user.unauthorized, null, 401 ));
  }
  await next();
};

const user = async (req, res, next) => {
  const { admin } = req.permission;
  if(admin || !req.authenticated) {
    return res.status(401).send(response( messages.error.user.unauthorized, null, 401 ));
  }
  await next();
};

const general = async (req, res, next) => {
  if(!req.permission || !req.authenticated) {
    return res.status(401).send(response( messages.error.user.unauthorized, null, 401 ));
  }
  await next();
};

module.exports = {
  admin,
  user,
  general
};
