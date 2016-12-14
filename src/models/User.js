import mongoose from 'mongoose';
import { saltRounds } from '../config/hash.js';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	admin: {
		type: Boolean,
		default: false,
	}

});

function hashPassword(next) {
	const ctx = this;
	bcrypt.hash(ctx.password, saltRounds, function(err, hash) {
  	if (err) {
  		const initErr = new Error(err);
  		next(initErr);
  	}
  	ctx.password = hash;

  	next();
	});
}

userSchema.pre('save', hashPassword);

const User = mongoose.model('user', userSchema);

export default User;