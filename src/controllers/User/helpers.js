import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const helpers = {};

function unHashPassword(plainTextPassword, hash) {
	return bcrypt.compare(plainTextPassword, hash);
}

function createToken(user) {
	return jwt.sign(user, process.env.SECRET, {
		expiresIn: '1 day'
	});
}

function checkForEmailPass(req) {
	req.checkBody('email', 'Must provide email.')
	.notEmpty();

	req.checkBody('password', 'Must provide password.')
	.notEmpty();

	return req.validationErrors();	
}

helpers.unHashPassword = unHashPassword;
helpers.createToken = createToken;
helpers.checkForEmailPass = checkForEmailPass;

export default helpers;