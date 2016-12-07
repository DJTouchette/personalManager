import BaseController from './BaseController';

// Reference to the model
const reference = 'Todo';

class TodoController extends BaseController {
	constructor() {
		super(reference);
	}
}

export default TodoController;