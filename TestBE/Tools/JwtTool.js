const jwt = require("jsonwebtoken");
const secret = '11134ifiuafjabjbgadyubad';
const expire = 60 * 60 * 24 * 5;

// initial token
function createToken(username) {
	var token = jwt.sign({ username: username }, secret, {
		expiresIn: expire
	})
	return token;
}

// verify token
function verifyToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (error, result) => {
			if (error) {
				reject(token);
			} else {
				resolve(result);
			}
		})
	})
}

module.exports = {
	createToken: createToken,
	verifyToken: verifyToken,
	expire: expire
}