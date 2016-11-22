import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
	// The text of the todo
	content: String,
	// If todo belongs to a bigger todo.
	hasParent: {
			required: true,
			type: Boolean,
	},
	// The ID of the bigger todo
	parentID: mongoose.Schema.Types.ObjectId,
	// Time frame of the fight, can only be daily, weekly, monthly, yearly
	timeFrame: {
			type: String,
			enum: ['daily', 'weekly', 'monthly', 'yearly'],
	},
	// If the todo is part of a event
	hasSchedule: {
			type: Boolean,
			required: true,
	},
	// The id of the scheduled event
	scheduleID: mongoose.Schema.Types.ObjectId,
	// Belongs to this User
	belongsTo: mongoose.Schema.Types.ObjectId,

});

const Todo = mongoose.model('todo', todoSchema);

export default Todo;
