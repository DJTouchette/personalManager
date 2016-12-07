import BaseController from '../BaseController/index';
// Reference to the model.
const reference = 'User';

class UserController extends BaseController {
	constructor() {
		super(reference);
	}

	signup(req, res, next) {
		super.create(req, res, next);
	}
}

export default UserController;