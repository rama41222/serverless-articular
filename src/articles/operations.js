const Article = require('./model');
const Topic = require('./../topics/model');

const list = async(limit = 10, skip = 0, sort, opts) => {
  console.log(opts, sort);
  const articles =  await Article.find()
    .where(opts)
    .populate('topicId', { name: 1, _id: 1 })
    .select({ __v: 0 })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .exec();
  
  const total = await Article.find()
    .where(opts)
    .select({_id: 1})
    .count();
  
  return { total, articles };
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
  article.user = id;
  let newArticle = await Article.create(article);
  newArticle = await newArticle
    .populate('article', { password: 0, __v: 0})
    .populate('topic', { name: 1, image: 1 })
    .execPopulate();
  newArticle = newArticle.toObject();
  delete newArticle.__v;
  return newArticle;
};

const update = async(id, article) => {
  if(!article) return null;
  const dbArticle = await Article.findById(id).where({ deleted: false });
  if(!dbArticle) return null;
  if(article.hasOwnProperty('title') && typeof article.title === 'string') dbArticle.title = article.title;
  if(article.hasOwnProperty('isFeatured') && typeof article.isFeatured === 'boolean') dbArticle.isFeatured = article.isFeatured;
  if(article.hasOwnProperty('tags') && Array.isArray(dbArticle.tags)) dbArticle.tags = Array.from(new Set(dbArticle.tags.concat(article.tags)));
  if(article.hasOwnProperty('image') && typeof article.image === 'string') dbArticle.image = article.image;
  if(article.hasOwnProperty('deleted') && typeof article.deleted === 'boolean') dbArticle.deleted = article.deleted;
  let updatedArticle = await dbArticle.save();
  if(updatedArticle) {
    updatedArticle = updatedArticle.toObject();
    delete updatedArticle.password;
    delete updatedArticle.__v;
  }
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
