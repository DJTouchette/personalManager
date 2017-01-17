import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { makeResponse, PrettyErrs, async } from '../ControllerHelpers/index';

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

function singUserIn(req, res, ctx) {
	const { email, password } = req.body;
	const validateVars = { res: res, password: password };

	ctx.controller.model.findOne({ email }).exec()
	.then(helpers.validatePassword.bind(validateVars))
	.catch(PrettyErrs.catch.bind(res));
}

function signin(plainTextPass, user, res) {
	function* checkPasswords() {
		try{
			const isPasswordCorrect = yield unHashPassword(plainTextPass, user.password);
			const content = yield isPasswordCorrect ? { jwt: createToken(user) } : 'Email or passsword is incorrect.';

			res.json(makeResponse(isPasswordCorrect, content));
		}
		catch(err) {
			PrettyErrs.err(res, err);
		}
	}

	async(checkPasswords)();
}

function signinGenerator(ctx, body, res) {
	function* generator() {
		const { email, password } = body;
		try {
			const user = yield ctx.controller.model.findOne({ email }).exec().catch(err => { throw err });

			yield signin(password, user, res);
		}
		catch(err) {
			PrettyErrs.err(res, err);
		}
	}

	async(generator)();
}

function signupGenerator(ctx, body, res ) {
	const generator = function* () {
			try {
				const newModel = new ctx.controller.model(body);

				yield newModel.save().catch(err => { throw err })

				yield signin(body.password, newModel, res);
			}
			catch(err) {
				PrettyErrs.err(res, err);
			}
		}

		async(generator)();
}

const helpers = {
	signupGenerator,
	signinGenerator,
	checkForEmailPass,
	singUserIn,
}

export default helpers;