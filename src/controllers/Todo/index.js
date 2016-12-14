import BaseController from '../BaseController/index';
import helpers from './helpers';
import { makeResponse, PrettyErrs } from '../ControllerHelpers/index';

// Reference to the model
const reference = 'Todo';

class TodoController extends BaseController {
	constructor() {
		super(reference);
	}

	create(req, res, next) {
		helpers.checkForContent(req);
		helpers.checkForParent(req);

		const noErrs = PrettyErrs.err(res, req.validationErrors(), true);

		if (noErrs === true) super.create(req, res, next, true);
  }

}

export default TodoController;