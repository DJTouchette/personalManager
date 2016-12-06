import BaseRoute from './BaseRoute.js';

const routeReference = 'TodoEvent';

class TodoEventRoutes extends BaseRoute {
	constructor() {
		super(routeReference);
	}


	initiate(app) {
		this.initiateRoutes(app);
		app.put(this.routeId + '/addtodo', this.controller.addTodo.bind(this));
	}
}

export default TodoEventRoutes;