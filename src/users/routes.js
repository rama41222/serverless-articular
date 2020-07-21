const { status, login, register, update, profile } = require('./view');

/**
 * User Routes
 * @param api
 * @param opts
 */
module.exports = (api, opts) => {
  api.get('/status', status);
  api.get('/profile', profile);
  api.post('/register', register);
  api.post('/login', login);
  api.put('/profile', update);
  // api.register('/admin/register', status);
  
};
