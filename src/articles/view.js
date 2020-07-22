const { response, messages } = require('./../lib');
const { hasArticleByName, create, listOne, list, update } = require('./operations');

const status = async(req, res) => {
  res.status(200).json(response(messages.success.general, {}, 200));
};

const postArticle = async (req, res) => {
  console.log(req.user);
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
  res.status(200).json(response(messages.success.general, await list(limit, skip)));
};

const listArticle = async(req, res) => {
  const id = req.params.id;
  res.status(200).json(response(messages.success.general, await listOne(id)));
};

const updateArticle = async(req, res) => {
  const updated = await update(req.body);
  if(!updated) {
    return res.status(201).json(response(messages.error.user.update));
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
