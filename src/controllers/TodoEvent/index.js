import BaseController from '../BaseController/index';
import { Todo, TodoEvent } from '../../models/index';

import helpers from './helpers';
import { makeResponse, PrettyErrs } from '../ControllerHelpers/index';

class TodoEventController extends BaseController {
    constructor() {
    super(TodoEvent);
  }

  findTodo(id) {
    return Todo.findById(id).exec();
  }

  create(req, res, next) {
    super.create(req, res, next, true);
  }

  // Adds Todo to TodoEvent.
  addTodo(req, res, next) {
    const findEventParams = { ctx: this, eventID: req.params.id, res: res };

    this.controller.findTodo(req.body.todoID)
    .then(helpers.findEvent.bind(findEventParams))
    .catch(PrettyErrs.catch.bind(res));
  }

}

export default TodoEventController;