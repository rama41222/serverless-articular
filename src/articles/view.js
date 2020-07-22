const { response, messages } = require('./../lib');
const { hasArticleByName, create, listOne, list, update } = require('./operations');

const status = async(req, res) => {
  res.status(200).json(response(messages.success.general, {}, 200));
};

const postArticle = async (req, res) => {
  const id = req.user._id;
  const article = await create(req.body, id);
  
  if(!article) {
    return res.status(400).json(response(messages.error.article.creation));
  }
  res.status(201).json(response(messages.success.article.created, article));
};

const listArticles = async(req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 100;
  let { isFeatured, views, order, field } = req.query;
  views = parseInt(views) || null;
  isFeatured = parseInt(isFeatured) || null;

  let opts = {};
  let sort = {};
  
  if(!req.user) {
    isFeatured = 0;
  }
  
  if(field && typeof field === 'string') sort[`${field}`] = order;
  if(typeof isFeatured  === 'number') opts.isFeatured = isFeatured;
  if(typeof views  === 'number') opts.views = views;
  
  res.status(200).json(response(messages.success.general, await list(limit, skip, sort, opts)));
};

const listArticle = async(req, res) => {
  const id = req.params.id;
  let opts = {};
  if(!req.user) {
    opts.isFeatured = 0;
  }
  res.status(200).json(response(messages.success.general, await listOne(id, opts) || {}));
};

const updateArticle = async(req, res) => {
  const { id } = req.params;
  const updated = await update(id,req.body);
  if(!updated) {
    return res.status(201).json(response(messages.error.article.update));
  }
  res.status(200).json(response(messages.success.update, updated));
};

module.exports = {
  status,
  postArticle,
  listArticles,
  listArticle,
  updateArticle
};
