'use strict';
const api = require('lambda-api')({ version: 'v1.0' });
const routes = require('./routes');
routes(api);

module.exports.handler = async (event, context, cb) => {
  return api.run(event, context, cb);
};
