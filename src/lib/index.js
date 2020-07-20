const middleware = require('./middleware');
const database  = require('./database');
const config = require('./config');
const { response, messages } = require('./utils');
/**
 * Exposing the required sections of the library
 * @type {{middleware: (function(*): Promise<void>)}}
 */
module.exports = {
  middleware,
  response,
  database,
  config,
  messages
};
