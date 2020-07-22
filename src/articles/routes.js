const { status, postArticle, listArticles, listArticle, updateArticle, fetchBst } = require('./view');
const authentication = require('./../services/authentication');
const { admin, user, general, guest } = require('../services/authorization');

/**
 * Article Routes
 * @param api
 * @param opts
 */
module.exports = (api, opts) => {
  // todo: binary tree view
  api.get('/bst', authentication, admin, fetchBst);
  api.get('/status', authentication, admin, status);
  api.get('/', authentication, listArticles);
  api.get('/:id', authentication,listArticle);
  api.put('/:id', authentication, admin, updateArticle);
  api.post('/', authentication, admin, postArticle);
};
