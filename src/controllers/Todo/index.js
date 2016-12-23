import BaseController from '../BaseController/index';
import helpers from './helpers';
import { Todo } from '../../models/index.js';
import { makeResponse, PrettyErrs } from '../ControllerHelpers/index';

// Todo controller, handles all actions belonging to the Todo model.
class TodoController extends BaseController {
	constructor() {
		super(Todo);
	}

  /*
  * Validates fields and calls BaseController.create
  */ 
	create(req, res, next) {
		helpers.checkForContent(req);
		helpers.checkForParent(req);

		const noErrs = PrettyErrs.err(res, req.validationErrors(), true);

		if (noErrs === true) super.create(req, res, next, true);
  }

}

export default TodoController;