const mongoose = require('mongoose');
const Config = require('./config');

const connectDB = async () => {
	const variables = Config.variables();
	const logger = Config.logger();
	try {
		const conn = await mongoose.connect(variables.mongoUri);
		logger.info(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		logger.error(`Error: ${error.message}`);
		process.exit();
	}
};

module.exports = connectDB;
