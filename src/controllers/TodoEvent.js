import BaseController from './BaseController';
// Reference to the model
const reference = 'TodoEvent';

class TodoEventController extends BaseController {
	constructor() {
		super(reference);
	}
}

export default TodoEventController;