import { 
	TodoController, 
	UserController, 
	TodoEventController 
} from '../controllers/index.js';

const baseRoute = '/api/v1/';

const controllerReference = {
	Todo: { controller: TodoController, route: 'todo' },
	User: { controller: UserController, route: 'user' },
	TodoEvent: { controller: TodoEventController, route: 'todoEvent' },
}

class BaseRoute {
	constructor(reference) {
		const controllerInfo = controllerReference[reference];

		this.controller = new controllerInfo.controller();
		this.routeName = baseRoute + controllerInfo.route;
		this.routeId = this.routeName + '/:id';
	}

	readById(app) {
		app.get(this.routeId, this.controller.getById.bind(this));
	}

	deleteById(app) {
		app.delete(this.routeId, this.controller.deleteDocument.bind(this));
	}

	create(app) {
		app.post(this.routeName, this.controller.create.bind(this));
	}

	updateById(app) {
		app.put(this.routeId, this.controller.updateDocument.bind(this));
	}

	getAll(app) {
		const getAllRoute = this.routeName + '/all';

		app.get(getAllRoute, this.controller.getAll.bind(this));
	}

	getByUser(app) {
		const byUserRoute = this.routeName + '/user';

		app.get(byUserRoute, this.controller.getByUser.bind(this));
	}

	initiateRoutes(app) {
		this.getByUser(app);
		this.getAll(app);
		this.readById(app);
		this.deleteById(app);
		this.create(app);
		this.updateById(app);
	}

}

export default BaseRoute;