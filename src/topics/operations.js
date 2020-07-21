const Topic = require('./model');

const list = async(limit = 10, skip = 0) => {
  return Topic.find().select({ __v: 0 }).skip(skip).limit(limit).exec();
};

const listOne = async(id) => {
  return Topic.findById(id).select({ __v: 0 }).exec();
};

const hasTopic = async(topicId) => {
  const count = await Topic.count({ _id: topicId }).exec();
  return count > 0;
};

const hasTopicByName = async(name) => {
  const count = await Topic.count({ name }).exec();
  return count > 0;
};

const create = async(topic) => {
  let newTopic = await Topic.create(topic);
  newTopic = newTopic.toObject();
  delete newTopic.__v;
  return newTopic;
};

module.exports = {
  list,
  hasTopic,
  listOne,
  create,
  hasTopicByName
};
