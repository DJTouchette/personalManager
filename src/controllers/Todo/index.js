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

		const errs = req.validationErrors();
		if (errs) return PrettyErrs.default(res, err);

		super.create(req, res, next);
  }

}

export default TodoController;