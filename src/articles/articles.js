'use strict';
const api = require('lambda-api')({ version: 'v1.0', base:'v1/articles'});
const routes = require('./routes');
const { middleware } = require('./../lib');
middleware(api);
routes(api);

module.exports.handler = async (event, context, cb) => {
  return api.run(event, context, cb);
};
