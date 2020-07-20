module.exports = async (api) => {
 api.use((req, res, next) => {
   res.cors();
   next();
 });
};
