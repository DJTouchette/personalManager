import BaseController from '../BaseController/index';
import { Todo, TodoEvent } from '../../models/index';

import helpers from './helpers';

import { makeResponse, PrettyErrs } from '../ControllerHelpers/index';

class TodoEventController extends BaseController {
  constructor() {
    super(TodoEvent);
  }

  findTodo(id) {
    return Todo.findById(id).exec()
    .catch((err) => {
      throw PrettyErrs.createErr('CantFind', 'Cannot find todo', 'todos', id);
    });
  }

  create(req, res, next) {
    super.create(req, res, next, true);
  }

  // Adds Todo to TodoEvent.
  addTodo(req, res, next) {
    const genParams = { ctx: this, req: req, res: res };
    helpers.addTodoGenerator(genParams);
  }

}

export default TodoEventController;