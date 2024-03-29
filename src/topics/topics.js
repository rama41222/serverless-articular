'use strict';
const api = require('lambda-api')({ version: 'v1.0', base:'/v1/topics'});
const routes = require('./routes');
const { middleware } = require('./../lib');
middleware(api);
routes(api);

module.exports.handler = async (event, context, cb) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return api.run(event, context, cb);
};
