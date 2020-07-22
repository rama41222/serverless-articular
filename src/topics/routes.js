const { status, postTopic, listTopics, listTopic } = require('./view');
const authentication = require('./../services/authentication');
const { admin, user, general } = require('../services/authorization');

/**
 * Topic Routes
 * @param api
 * @param opts
 */
module.exports = (api, opts) => {
  api.get('/status', authentication, admin, status);
  api.get('/:id', authentication, general, listTopic);
  api.get('/list', authentication, general, listTopics);
  api.post('/create', authentication, admin, postTopic);
};
