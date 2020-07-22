const Article = require('./model');

const list = async(limit = 10, skip = 0) => {
  return Article.find().populate('article', { name: 1, _id: 1 }).select({ __v: 0 }).skip(skip).limit(limit).exec();
};

const listOne = async(id, opts) => {
  return Article.findById(id).where(opts).populate('article', { name: 1, _id: 1 }).select({ __v: 0 }).exec();
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
  article.article = id;
  let newArticle = await Article.create(article);
  newArticle = await newArticle
    .populate('article', { password: 0, __v: 0})
    .populate('topic', { name: 1, image: 1 })
    .execPopulate();
  newArticle = newArticle.toObject();
  delete newArticle.__v;
  return newArticle;
};

const update = async(article) => {
  if(!article) return null;
  const dbArticle = await listOne(article.id, { deleted: false });
  if(!dbArticle) return null;
  if(article.name) dbArticle.name = article.name;
  if(article.isFeatured) dbArticle.isFeatured = article.isFeatured;
  if(article.tags) dbArticle.tags.concat(article.tags);
  if(article.image) dbArticle.image = article.image;
  if(!article.deleted) dbArticle.deleted = article.deleted;
  let updatedArticle = await dbArticle.save();
  if(updatedArticle) {
    updatedArticle = updatedArticle.toObject();
    delete updatedArticle.password;
    delete updatedArticle.__v;
  };
  return updatedArticle ? updatedArticle : null;
};

module.exports = {
  list,
  hasArticle,
  listOne,
  create,
  hasArticleByName,
  update
};
