const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = (password) => {
  const hashed = bcrypt.hash(password, saltRounds);
  return hashed;
};

module.exports = hashPassword;
