const { status, login, register, change, profile, makeAdmin } = require('./view');
const authentication = require('./../services/authentication');
const { admin, user, general } = require('../services/authorization');

/**
 * User Routes
 * @param api
 * @param opts
 */
module.exports = (api, opts) => {
  api.get('/status', authentication, admin, status);
  api.get('/profile', authentication, general, profile);
  api.post('/register', register);
  api.post('/login', login);
  api.put('/', authentication, general, change);
  api.put('/:id', authentication, admin, makeAdmin);
};
