import { makeResponse, PrettyErrs } from '../ControllerHelpers/index';
import { noTodoFoundErr, todoIDFieldErr } from '../ControllerHelpers/constants';

const helpers = {};

function checkForTodoID(req) {
	req.checkBody('todoID', todoIDFieldErr)
	.notEmpty();

	return req.validationErrors();
}

function findEvent(todo) {
	if (!todo) Promise.reject(new Error('Not a valid Todo ID.'));

	const { ctx, eventID } = this;
	const addTodoParams = { todo, res: this.res };

	ctx.controller.model.findById(eventID).exec()
	.then(addTodoToEvent.bind(addTodoParams))
	.catch(PrettyErrs.catch.bind(this.res));
}

function addTodoToEvent(todoEvent) {
	if (!todoEvent) Promise.reject(new Error('Not a valid TodoEvent ID.'));
	todoEvent.todos.push(this.todo);

	todoEvent.save()
	.then(saveTodo.bind(this))
	.catch(PrettyErrs.catch.bind(this.res));
}

function saveTodo(savedTodoEvent) {
	return this.res.json(makeResponse(true, savedTodoEvent));
}


helpers.checkForTodoID = checkForTodoID;
helpers.findEvent = findEvent;
helpers.addTodoToEvent = addTodoToEvent;
helpers.saveTodo = saveTodo;

export default helpers;