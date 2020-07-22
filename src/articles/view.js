const { response, messages } = require('./../lib');
const { hasArticleByName, create, listOne, list } = require('./operations');

const status = async(req, res) => {
  res.status(200).json(response(messages.success.general, {}, 200));
};

const postArticle = async (req, res) => {
  const { name } = req.body;
  const exists = await hasArticleByName(name);
  
  if(exists) {
    return res.status(400).json(response(messages.error.article.duplicate));
  }
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

module.exports = {
  status,
  postArticle,
  listArticles,
  listArticle,
};
