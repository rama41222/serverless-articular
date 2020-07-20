const response = (message, data, status) => {
  if(!status) {
    status = data ? 200 : 400;
  }
  return { message, data, status }
};

module.exports = {
  response
};
