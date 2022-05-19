const status = (message, statusCode = null) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': '*',
  },
  body: JSON.stringify(message),
});

module.exports = {
  status,
};
