require("dotenv").config();
const { verify, sign } = require("jsonwebtoken");

const tokenConfigs = {
  access: { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: "6h" },
  refresh: { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: "30d" },
};

const decodeToken = (token, kind) => {
  if (!token) return;
  token = token.split(" ")[1];
  if (!token) return;
  const secret = tokenConfigs[kind].secret;
  return verify(token, secret);
};

const encodeToken = (payload, kind, options = {}) => {
  const secret = tokenConfigs[kind].secret;
  const expiresIn = options.expiresIn || tokenConfigs[kind].expiresIn;
  return sign(payload, secret, { ...options, expiresIn });
};

module.exports = { decodeToken, encodeToken };
