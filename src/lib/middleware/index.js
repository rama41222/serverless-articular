const { connect } = require('./../database');

module.exports = async (api) => {
  
  await connect();
  
  api.use((req, res, next) => {
   res.cors();
   next();
 });
 
};
