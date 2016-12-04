import mongoose from 'mongoose';

const todoEventSchema = new mongoose.Schema({

	content: String,

	todos: [
		{ 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'todo',
		}
	],

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