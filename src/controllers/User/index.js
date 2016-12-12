import BaseController from '../BaseController/index';
import { makeResponse } from '../ControllerHelpers/index';
import helpers from './helpers';

// Reference to the model.
const reference = 'User';

class UserController extends BaseController {
	constructor() {
		super(reference);
	}

	signup(req, res, next) {
		super.create(req, res, next);
	}

	signIn(req, res, next) {
		const { email, password } = req.body;
		const UserToAuth = super.getBy({email});
		let currentUser;

		UserToAuth.then((user) => {
			if (!user) return res.json(makeResponse(false, 'Email does not exist.'));

			return user;
		}).then((user) => {
			currentUser = user;
			const isPasswordCorrect = helpers.unHashPassword(password, user.password);

			isPasswordCorrect.then((isCorrect) => {
				// console.log(process.env);
				const content = isCorrect ? { jwt: helpers.createToken(currentUser, process.env.SECRET) } : 'Email or passsword is incorrect.';

				return res.json(makeResponse(isCorrect, content));
			})
			.catch((err) => {
				return res.json(makeResponse(false, err));
			}); 
		});
		
	}
}

export default UserController;