import BaseRoute from './BaseRoute.js';

const routeReference = 'User';

class UserRoutes extends BaseRoute {
	constructor() {
		super(routeReference);
	}

	signup(app) {
		app.post('/signup', this.controller.signup.bind(this));
	}

	signIn(app) {
		app.post('/authenticate', this.controller.signIn.bind(this));
	}

	initiate(app) {
		this.signup(app);
		this.signIn(app)
		super.initiateRoutes(app);
	}
}

export default UserRoutes;