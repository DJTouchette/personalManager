import mongoose from 'mongoose';
import { todoSchema } from './Todo.js';

const todoEventSchema = new mongoose.Schema({

	content: String,

	todos: [todoSchema],

	timeFrame: {
		type: String,
		enum: ['daily', 'weekly', 'monthly', 'yearly'],
	},

	hasSchedule: {
		type: Boolean,
		required: true,
	},

});

const TodoEvent = mongoose.model('todoEvent', todoEventSchema);

export default TodoEvent;