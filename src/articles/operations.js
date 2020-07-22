const Article = require('./model');

const list = async(limit = 10, skip = 0) => {
  return Article.find().populate('user', { name: 1, _id: 1 }).select({ __v: 0 }).skip(skip).limit(limit).exec();
};

const listOne = async(id) => {
  return Article.findById(id).populate('user', { name: 1, _id: 1 }).select({ __v: 0 }).exec();
};

const hasArticle = async(articleId) => {
  const count = await Article.count({ _id: articleId }).exec();
  return count > 0;
};

const hasArticleByName = async(name) => {
  const count = await Article.count({ name }).exec();
  return count > 0;
};

const create = async(article, id) => {
  article.user = id;
  let newArticle = await Article.create(article);
  newArticle = await newArticle.populate('user', { password: 0, __v: 0}).execPopulate();
  newArticle = newArticle.toObject();
  delete newArticle.__v;
  return newArticle;
};

module.exports = {
  list,
  hasArticle,
  listOne,
  create,
  hasArticleByName
};
