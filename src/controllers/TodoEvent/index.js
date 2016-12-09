import BaseController from '../BaseController/index';
import { Todo } from '../../models/index';

import helpers from './helpers';
import { makeResponse, PrettyErrors } from '../ControllerHelpers/index';

// Reference to the model
const reference = 'TodoEvent';

class TodoEventController extends BaseController {
    constructor() {
    super(reference);
  }

  findTodo(id) {
    return Todo.findById(id).exec();
  }

/*
* Adds a todo to the todoEvent
*/ 
  addTodo(req, res, next) {
    const errs = helpers.checkForTodoID(req);

    if (errs) return res.json(makeResponse(false, errs));

    const helperParams = {
      id: req.params.id,
      todoID: req.body.todoID,
      ctx: this,
    };

    const addTodoPromise = helpers.addTodo(helperParams);
    addTodoPromise.then((response) => {
      res.json(response);
    });
  }

}

export default TodoEventController;