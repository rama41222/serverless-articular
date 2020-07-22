const { status, postArticle, listArticles, listArticle, updateArticle } = require('./view');
const authentication = require('./../services/authentication');
const { admin, user, general } = require('../services/authorization');

/**
 * Article Routes
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
  
  api.put('/', authentication, admin, updateArticle);
  api.post('/:id/tags', authentication, admin, status);
  api.post('/', authentication, admin, postArticle);
};
