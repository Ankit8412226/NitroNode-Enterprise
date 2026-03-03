const Token = require('./token.model');

const saveToken = async ({ token, user, type, expires }) => {
  return Token.create({ token, user, type, expires });
};

const findToken = async (token, type, blacklisted = false) => {
  return Token.findOne({ token, type, blacklisted });
};

const deleteToken = async (token, type) => {
  return Token.deleteMany({ token, type });
};

const deleteUserTokens = async (user, type) => {
  return Token.deleteMany({ user, type });
};

const deleteExpired = async () => {
  return Token.deleteMany({ expires: { $lt: new Date() } });
};

module.exports = {
  saveToken,
  findToken,
  deleteToken,
  deleteUserTokens,
  deleteExpired,
};
