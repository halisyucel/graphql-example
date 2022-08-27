const mongoose = require('mongoose');

module.exports = () => {
	mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
	mongoose.connection.on('open', () => {
		console.log('Connected to MongoDB');
	});
	mongoose.connection.on('error', (err) => {
		console.log(err);
	});
}