const bcrypt = require("bcrypt");

const saltRounds = 10;

async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw error;
  }
}

async function comparePassword(password, encrpytedPassword) {
  try {
    return await bcrypt.compare(password, encrpytedPassword);
  } catch (error) {
    throw error;
  }
}

module.exports = { encryptPassword, comparePassword };
