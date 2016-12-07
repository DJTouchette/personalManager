import BaseController from '../BaseController/index';
import helpers from './helpers';
import { makeResponse } from '../ControllerHelpers/index';

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
		if (errs) return res.json(makeResponse(false, errs));

		super.create(req, res, next);
  }

}

export default TodoController;