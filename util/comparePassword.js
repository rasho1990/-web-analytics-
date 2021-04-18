const bcrypt = require('bcrypt');

const comparePassword = (password, hash) => {
	const isCorrect = bcrypt.compare(password, hash);
	return isCorrect;
};

module.exports = comparePassword;
