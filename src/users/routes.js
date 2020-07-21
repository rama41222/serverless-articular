const { status } = require('./view');

/**
 * User Routes
 * @param api
 * @param opts
 */
module.exports = (api, opts) => {
  api.get('/status', status);
  api.post('/register', status);
  api.post('/login', status);
  api.register('/admin/register', status);
  api.get('/profile', status);
};
