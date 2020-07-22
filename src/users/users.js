'use strict';
const api = require('lambda-api')({ version: 'v1.0', base:'v1/users'});
const routes = require('./routes');
const { middleware, seeder } = require('./../lib');
middleware(api);
routes(api);
seeder();

module.exports.handler = async (event, context, cb) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return api.run(event, context, cb);
};
