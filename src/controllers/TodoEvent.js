import BaseController from './BaseController';
import { Todo } from '../models/index.js';

import PrettyErrors from './errorHelper.js';
import { makeResponse } from './errorHelper.js';

// Reference to the model
const reference = 'TodoEvent';

class TodoEventController extends BaseController {
	constructor() {
		super(reference);
	}

/*
* Adds a todo to the todoEvent
*/ 
  addTodo(req, res, next) {
    const { id } = req.params;
    const { todoID } = req.body;
    const ctx = this;
    let foundTodo;

    if (!todoID) return res.json(makeResponse(false, "Must provide todo id and todo event id."));
    const findTodo = Todo.findById(todoID).exec();

    findTodo.then((doc) => {
    	if (!doc) return res.json(PrettyErrors.noDoc());
    	
    	return doc;
    })
    .then((todo) => {
    	foundTodo = todo;
    	
    	return ctx.controller.model.findById(id).exec();
    })
    .then((todoEvent) => {
    	if (!todoEvent) return res.json(PrettyErrors.noDoc());
    	
    	todoEvent.todos.push(foundTodo);
    	return todoEvent.save();
    })
    .then((savedTodoEvent) => {
    	return res.json(makeResponse(true, savedTodoEvent));
    })
    .catch((err) => {
   		return res.json(PrettyErrors.err(err));
    });
  }


}

export default TodoEventController;