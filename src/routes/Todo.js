import BaseRoute from './BaseRoute.js';

const routeReference = 'Todo';

class TodoRoutes extends BaseRoute {
	constructor() {
		super(routeReference);
	}

	initiate(app) {
		super.initiateRoutes(app);
	}
}

export default TodoRoutes;