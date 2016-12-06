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
    const todoID = req.body.id;
    const ctx = this;

    Todo.findById(todoID, (err, doc) => {
    	if (err) return res.json(PrettyErrors.err(err));
    	if (!doc) return res.json(PrettyErrors.noDoc());

    	ctx.controller.model.findById(id, (err, todoEvent) => {
	    	if (err) return res.json(PrettyErrors.err(err));
	    	if (!todoEvent) return res.json(PrettyErrors.noDoc());

	    	todoEvent.todos.push(doc);
	    	todoEvent.save((err, savedTodoEvent) => {
	    		if (err) return res.json(PrettyErrors.err(err));

	    		return res.json(makeResponse(true, savedTodoEvent));
	    	});
    	});
    });
  }


}

export default TodoEventController;