import BaseRoute from './BaseRoute.js';

const routeReference = 'User';

class UserRoutes extends BaseRoute {
	constructor() {
		super(routeReference);
	}

	signup(app) {
		app.post('/signup', this.controller.signup.bind(this));
	}

	initiate(app) {
		this.signup(app);
		super.initiateRoutes(app);
	}
}

export default UserRoutes;