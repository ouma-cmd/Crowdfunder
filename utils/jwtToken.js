const { verify, sign } = require("jsonwebtoken");
require("dotenv").config;

const signeToken = (payload) => {
  return sign(payload, process.env.SECRET_KEY_ACCESS_TOKEN);
};
const viryfieToken = (token) => {
  return verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
};
module.exports = {
  signeToken,
  viryfieToken,
};
