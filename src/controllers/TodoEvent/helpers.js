import { makeResponse, PrettyErrs, async } from '../ControllerHelpers/index';
import { noTodoFoundErr, todoIDFieldErr } from '../ControllerHelpers/constants';


function checkForTodoID(req) {
	req.checkBody('todoID', todoIDFieldErr)
	.notEmpty();

	return req.validationErrors();
}

function addTodoGenerator(obj) {
	const { ctx, req, res } = obj;

	const generator = function* () {
    try {
      const todo = yield ctx.controller.findTodo(req.body.todoID, res);
      const todoEvent = yield ctx.controller.model.findById( req.params.id).exec();

      if (!todo || !todoEvent) throw new Error('No Todo');

      todoEvent.todos.push(todo);
      todoEvent.save((err) => {
        if (err) throw err;

        res.json((makeResponse(true, todoEvent)));
      });
    }
    catch(err) {
      PrettyErrs.err(res, err);
    }

  }

	async(generator)()
}

const helpers = {
	checkForTodoID,
	addTodoGenerator,
}

export default helpers;