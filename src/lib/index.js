const database  = require('./database');
const middleware = require('./middleware');
const config = require('./config');
const { response, messages, seeder } = require('./utils');
/**
 * Exposing the required sections of the library
 * @type {{middleware: (function(*): Promise<void>)}}
 */
module.exports = {
  response,
  database,
  config,
  messages,
  middleware,
  seeder
};
