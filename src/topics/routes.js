const { status } = require('./view');

/**
 * User Routes
 * @param api
 * @param opts
 */
module.exports = (api, opts) => {
  api.get('/status', status);
};
