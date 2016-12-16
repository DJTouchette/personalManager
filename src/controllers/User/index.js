import BaseController from '../BaseController/index';
import { makeResponse } from '../ControllerHelpers/index';
import { PrettyErrs } from '../ControllerHelpers/index';
import helpers from './helpers';

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
		const validateVars = { res: res, password: password };

		super.getBy({ email })
		.then(helpers.validatePassword.bind(validateVars))
		.catch(PrettyErrs.catch.bind(res));
	}
}

export default UserController;