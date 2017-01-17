import BaseController from '../BaseController/index';
import { makeResponse } from '../ControllerHelpers/index';
import { PrettyErrs, async } from '../ControllerHelpers/index';
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

		const { body } = req;

		helpers.signupGenerator(this, body, res);
	}

	signIn(req, res, next) {
		const validationErrs = helpers.checkForEmailPass(req);
		if (validationErrs) return PrettyErrs.default(res, validationErrs);

		helpers.signinGenerator(this, req.body, res);
	}
}

export default UserController;