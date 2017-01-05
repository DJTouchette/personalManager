import BaseController from '../BaseController/index';
import { makeResponse } from '../ControllerHelpers/index';
import { PrettyErrs } from '../ControllerHelpers/index';
import { User } from '../../models/index.js';
import helpers from './helpers';

class UserController extends BaseController {
	constructor() {
		super(User);
	}

	signup(req, res, next) {
		// Ensure email and password are present
		const validationErrs = helpers.checkForEmailPass(req);
		if (validationErrs) return PrettyErrs.default(res, validationErrs);

		const ctx = this;
		const { body } = req;

		// Create new User model
    const newModel = new this.controller.model(body);

		// Create promise to save user, then sign user in.
		const newUser = new Promise ((resolve, reject) => {
			// Saving new user
			newModel.save((err) => {
				if (err) return reject(err);
    	})
			.then(() => {
				const validateVars = { res: res, password: body.password };

				// Getting JWT for user
				helpers.validatePassword(newModel, validateVars);
			})
			.catch(PrettyErrs.catch.bind(res));
		})
		.catch(PrettyErrs.catch.bind(res));; 
		
	}

	signIn(req, res, next) {
		const validationErrs = helpers.checkForEmailPass(req);
		if (validationErrs) return PrettyErrs.default(res, validationErrs);

		helpers.singUserIn(req, res, this);
	}
}

export default UserController;