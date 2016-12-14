import BaseController from '../BaseController/index';
import { Todo } from '../../models/index';

import helpers from './helpers';
import { makeResponse, PrettyErrs } from '../ControllerHelpers/index';

// Reference to the model
const reference = 'TodoEvent';

class TodoEventController extends BaseController {
    constructor() {
    super(reference);
  }

  findTodo(id) {
    return Todo.findById(id).exec();
  }

  create(req, res, next) {
    super.create(req, res, next, true);
  }

/*
* Adds a todo to the todoEvent
*/ 
  addTodo(req, res, next) {
    let foundTodo;

    const findTodoQuery = this.controller.findTodo(req.body.todoID);

    findTodoQuery.then((todo) => {
      foundTodo = todo;

      return this.controller.model.findById(req.params.id).exec();
    })
    .then((todoEvent) => {
      todoEvent.todos.push(foundTodo);

      return todoEvent.save();
    })
    .then((savedTodoEvent) => {
      return res.json(makeResponse(true, savedTodoEvent));
    })
    .catch((err) => {
      return PrettyErrs.err(res, err, false);
    });
  }

}

export default TodoEventController;