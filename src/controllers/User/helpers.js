import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const helpers = {};

function unHashPassword(plainTextPassword, hash) {
	return bcrypt.compare(plainTextPassword, hash);
}

function createToken(user, secret) {
	return jwt.sign(user, secret, {
		expiresIn: '1 day'
	});
}

function verifyToken(token, secret) {
	return jwt.verify(token, secret);
}

helpers.unHashPassword = unHashPassword;
helpers.createToken = createToken;
helpers.verifyToken = verifyToken;

export default helpers;