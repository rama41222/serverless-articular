const BinaryHeap = require('binaryheap');
const Article = require('./model');
const Topic = require('./../topics/model');
const User = require('./../users/model');

const hasViewed = async(id) => {
  await Article.updateOne({ _id: id },{ $inc: { views: 1 }}, { new: true});
};

const list = async(limit = 10, skip = 0, sort, opts) => {
  const articles =  await Article.find()
    .where(opts)
    .populate('topicId', { name: 1, _id: 1 })
    .populate('user', { name: 1, _id: 1 })
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
  await hasViewed(id);
  return Article.findById(id).where(opts).populate('article', { name: 1, _id: 1 }).select({ __v: 0 }).exec();
};

const hasArticle = async(articleId) => {
  const count = await Article.count({ _id: articleId }).exec();
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
  let bst;
  if(updatedArticle) {
    if(article.hasOwnProperty('deleted') && typeof article.deleted === 'boolean')  {
      bst = await binarySearchTree();
    }
    updatedArticle = updatedArticle.toObject();
    delete updatedArticle.password;
    delete updatedArticle.__v;
  }
  return updatedArticle ? bst? bst : updatedArticle : null;
};

const binarySearchTree = async() => {
  const articleData = await list(0, 0, {}, { deleted: false });
  const { articles, total } = articleData
  const heap = new BinaryHeap();
  articles.forEach(a => heap.insert({ value: {views: a.views, key: a._id}}, a.views));
  const arr = [];
  while (heap.length) {
    arr.push(heap.pop().value);
  }
  return arr;
};

module.exports = {
  list,
  hasArticle,
  listOne,
  create,
  update,
  hasViewed,
  binarySearchTree
};
