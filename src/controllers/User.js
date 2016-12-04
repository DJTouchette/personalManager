import BaseController from './BaseController';
// Reference to the model.
const reference = 'User';

class UserController extends BaseController {
	constructor() {
		super(reference);
	}

	signup(req, res, next) {
		console.log('here son');
		super.create(req, res, next);
	}
}

export default UserController;