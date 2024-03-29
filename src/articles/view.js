const { response, messages } = require('./../lib');
const { create, listOne, list, update, binarySearchTree } = require('./operations');

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
  let { isFeatured, views, order, field, topicId } = req.query;
  if(views) views = parseInt(views) || null;
  if(isFeatured) isFeatured = isFeatured == 1 ? 1 : 0;

  let opts = { deleted: false };
  let sort = {};
  
  if(!req.user) {
    isFeatured = 0;
  }
  if(field && typeof field === 'string') sort[`${field}`] = order;
  if(topicId && typeof topicId === 'string') opts.topicId = topicId;
  if(typeof isFeatured  === 'number') opts.isFeatured = isFeatured;
  if(typeof views  === 'number') opts.views = views;
  res.status(200).json(response(messages.success.general, await list(limit, skip, sort, opts)));
};

const listArticle = async(req, res) => {
  const id = req.params.id;
  let opts = { deleted: false };
  if(!req.user) {
    opts.isFeatured = 0;
  }
  const article = await listOne(id, opts);
  if(!article) {
    res.status(200).json(response(messages.error.article.not_found, {}, 200));
  }
  const { tags } = article;
  opts.tags = { $in: tags };
  opts._id = { $ne: article._id };
  const relatedArticles = await list(10, 0,{}, opts);
  res.status(200).json(response(messages.success.general, { article, relatedArticles }));
};

const updateArticle = async(req, res) => {
  const { id } = req.params;
  const updated = await update(id,req.body);
  if(!updated) {
    return res.status(201).json(response(messages.error.article.update));
  }
  res.status(200).json(response(messages.success.update, updated));
};

const fetchBst = async(req, res) => {
  const bst = await binarySearchTree();
  if(!bst) {
    return res.status(201).json(response(messages.error.article.invalid_bst));
  }
  res.status(200).json(response(messages.success.general, bst));
};

module.exports = {
  status,
  postArticle,
  listArticles,
  listArticle,
  updateArticle,
  fetchBst
};
