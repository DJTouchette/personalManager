import BaseRoute from './BaseRoute.js';

const routeReference = 'TodoEvent';

class TodoEventRoutes extends BaseRoute {
	constructor() {
		super(routeReference);
	}

	initiate(app) {
		super.initiateRoutes(app);
	}
}

export default TodoEventRoutes;