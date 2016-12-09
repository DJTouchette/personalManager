import { makeResponse, PrettyErrors } from '../ControllerHelpers/index';
import { noTodoFoundErr, todoIDFieldErr } from '../ControllerHelpers/constants';

const helpers = {};

function addTodo(params) {
	const { id, todoID, ctx } = params;
	let foundTodo;

	  if (!todoID) return res.json(makeResponse(false, noTodoFoundErr));
    const findTodo = ctx.controller.findTodo(todoID);

    const response = findTodo.then((doc) => {
    	if (!doc) return PrettyErrors.noDoc();
    	
    	return doc;
    })
    .then((todo) => {
    	foundTodo = todo;
    	
    	return ctx.controller.model.findById(id).exec();
    })
    .then((todoEvent) => {
    	if (!todoEvent) return PrettyErrors.noDoc();
   
    	todoEvent.todos.push(foundTodo);
    	return todoEvent.save();
    })
    .then((savedTodoEvent) => {
    	return makeResponse(true, savedTodoEvent);
    })
    .catch((err) => {
   		return PrettyErrors.err(err);
    });

    return response;

}

function checkForTodoID(req) {
	req.checkBody('todoID', todoIDFieldErr)
	.notEmpty();

	return req.validationErrors();
}

helpers.addTodo = addTodo;
helpers.checkForTodoID = checkForTodoID;

export default helpers;