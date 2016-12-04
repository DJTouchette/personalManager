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
	parentID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'todoEvent'
	},
	// Time frame of the fight, can only be daily, weekly, monthly, yearly
	timeFrame: {
		type: String,
		enum: ['daily', 'weekly', 'monthly', 'yearly'],
	},
	// Belongs to this User
	belongsTo: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'user',
	},

});

const Todo = mongoose.model('todo', todoSchema);

export default Todo;
