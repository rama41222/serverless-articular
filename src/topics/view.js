const { response, messages } = require('./../lib');
const { hasTopicByName, create, listOne, list } = require('./operations');

const status = async(req, res) => {
  res.status(200).json(response(messages.success.general, {}, 200));
};

const postTopic = async (req, res) => {
  const { name } = req.body
  const exists = await hasTopicByName(name);
  
  if(exists) {
    return res.status(400).json(response(messages.error.topic.duplicate));
  }
  
  const topic = await create(req.body);
  
  if(!topic) {
    return res.status(400).json(response(messages.error.topic.creation));
  }
  res.status(201).json(response(messages.success.topic.created, topic));
};

const listTopics = async(req, res) => {
  const skip = req.query.skip || 0;
  const limit = req.query.limit || 100;
  res.status(200).json(response(messages.success.general, await list(limit, skip)));
};

const listTopic = async(req, res) => {
  const id = req.params.id;
  res.status(200).json(response(messages.success.general, await listOne(id)));
};

module.exports = {
  status,
  postTopic,
  listTopics,
  listTopic,
};
