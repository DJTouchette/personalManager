import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { makeResponse, PrettyErrs } from '../ControllerHelpers/index';

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

function sendResponse(isCorrect) {
	const { res, user } = this;
	const content = isCorrect ? { jwt: createToken(user) } : 'Email or passsword is incorrect.';

	return res.json(makeResponse(isCorrect, content));
}

function validatePassword(user, ctx) {
	if (!user) return Promise.reject(new Error('User does not exist'));
	
	let obj = this;
	if (ctx) obj = ctx;
;
	const isPasswordCorrect = unHashPassword(obj.password, user.password);
	const responseVars = { res: obj.res, user };

	isPasswordCorrect
	.then(sendResponse.bind(responseVars))
	.catch(PrettyErrs.catch.bind(this.res));
}

function singUserIn(req, res, ctx) {
	const { email, password } = req.body;
	const validateVars = { res: res, password: password };

	ctx.controller.model.findOne({ email }).exec()
	.then(helpers.validatePassword.bind(validateVars))
	.catch(PrettyErrs.catch.bind(res));
}

helpers.unHashPassword = unHashPassword;
helpers.createToken = createToken;
helpers.checkForEmailPass = checkForEmailPass;
helpers.validatePassword = validatePassword;
helpers.singUserIn = singUserIn;

export default helpers;