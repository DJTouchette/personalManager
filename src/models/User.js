import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
	},
	password: String,
});

const User = mongoose.model('user', userSchema);

export default User;