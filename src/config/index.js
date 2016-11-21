import mongoConnect from './mongo.js';

function config(enviroment, app) {
	mongoConnect(enviroment.MONGO_URI);
}

export default config;