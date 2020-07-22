const { status, postArticle, listArticles, listArticle } = require('./view');
const authentication = require('./../services/authentication');
const { admin, user, general } = require('../services/authorization');
/**
 * User Routes
 * @param api
 * @param opts
 */
module.exports = (api, opts) => {
  // todo: binary tree view
  api.get('/bst', authentication, admin, status);
  api.get('/status', authentication, admin, status);
  // todo: order by, skip, limit, by tags, featured
  api.get('/', status);
  api.get('/:id', status);
  // todo: get articles by topic id,  =>  order by, skip, limit, by tags, featured
  api.get('/topics/:id', status);
  // todo: update tags or put tags
  api.put('/:id', authentication, admin, status);
  api.post('/:id/tags', authentication, admin, status);
  api.post('/', authentication, admin, status);
  api.delete('/', authentication, admin, status);
};
