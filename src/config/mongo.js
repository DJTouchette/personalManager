import mongoose from 'mongoose';

function mongoConnect(url) {
	mongoose.connect(url);
	mongoose.Promise = global.Promise;
}

export default mongoConnect;
