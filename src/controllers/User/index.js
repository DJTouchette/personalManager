import BaseController from '../BaseController/index';
import { makeResponse } from '../ControllerHelpers/index';
import { PrettyErrs } from '../ControllerHelpers/index';
import helpers from './helpers';

function handleErr(err) {
	return this.json(makeResponse(false, err.message));
};
// Reference to the model.
const reference = 'User';

class UserController extends BaseController {
	constructor() {
		super(reference);
	}


	signup(req, res, next) {
		const validationErrs = helpers.checkForEmailPass(req);
		if (validationErrs) return PrettyErrs.default(res, validationErrs);

		super.create(req, res, next);
	}

	signIn(req, res, next) {
		const validationErrs = helpers.checkForEmailPass(req);
		if (validationErrs) return PrettyErrs.default(res, validationErrs);

		const { email, password } = req.body;
		const UserToAuth = super.getBy({ email });
		let currentUser;

		UserToAuth.then((user) => {
			if (!user) return Promise.reject(new Error('user does not exist'));

			return user;
		})
		.then((user) => {
			currentUser = user;
			const isPasswordCorrect = helpers.unHashPassword(password, user.password);

			isPasswordCorrect
			.then((isCorrect) => {
				const content = isCorrect ? { jwt: helpers.createToken(currentUser) } : 'Email or passsword is incorrect.';

				return res.json(makeResponse(isCorrect, content));
			})
			.catch(PrettyErrs.catch.bind(res)); 
		})
		.catch(PrettyErrs.catch.bind(res));
	}
}

export default UserController;