import mongoose from 'mongoose';

function mongoConnect(url) {
	mongoose.connect(url);
}

export default mongoConnect;
