const { status, postArticle, listArticles, listArticle, updateArticle } = require('./view');
const authentication = require('./../services/authentication');
const { admin, user, general, guest } = require('../services/authorization');

/**
 * Article Routes
 * @param api
 * @param opts
 */
module.exports = (api, opts) => {
  // todo: binary tree view
  api.get('/bst', authentication, admin, status);
  api.get('/status', authentication, admin, status);

  api.get('/', authentication, guest, listArticles);
  
  api.get('/:id', authentication, guest,listArticle);
  
  // todo: get articles by topic id,  =>  order by, skip, limit, by tags, featured
  // api.get('/topics/:id', status);
  
  api.put('/:id', authentication, admin, updateArticle);
  api.post('/', authentication, admin, postArticle);
};
