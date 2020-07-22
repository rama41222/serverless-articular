const expect = require('chai').expect;
const dotenv = require('dotenv');
const env = process.argv[process.argv.length-1];
dotenv.config({path: `./env/.env.${env}`});

const {
  update,
  list,
  auth,
  hasUser,
  listByEmail,
  create,
  listOne } = require('./../src/users/operations');

describe('operations.js', () => {
  
  describe('Create User', () => {
    it('Created user should not be undefined', async() => {

    });
    
    it('Created user should have keys', async() => {

    });
  });
});
