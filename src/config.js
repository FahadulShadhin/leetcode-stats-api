require('dotenv').config();
const winston = require('winston');
const mongoose = require('mongoose');

class Config {
	static logger() {
		return winston.createLogger({
			level: 'info',
			format: winston.format.json(),
			transports: [
				new winston.transports.Console({ format: winston.format.simple() }),
			],
		});
	}

	static variables() {
		const leetcodeGraphqlEndpoint = process.env.LEETCODE_GRAPHQL_ENDPOINT;
		const port = process.env.PORT || 3000;
		const mongoUri = process.env.MONGO_URI || 'mongodb://0.0.0.0:27017';
		const dbName = process.env.DB_NAME || 'leetcode-stats';
		return {
			leetcodeGraphqlEndpoint,
			port,
			mongoUri,
			dbName,
		};
	}

	static async connectDB() {
		const variables = Config.variables();
		const logger = Config.logger();

		try {
			const conn = await mongoose.connect(
				`${variables.mongoUri}/${variables.dbName}`
			);
			logger.info(
				`MongoDB connected: ${conn.connection.host} | database: ${conn.connection.name}`
			);
		} catch (error) {
			logger.error(`Error: ${error.message}`);
			process.exit();
		}
	}
}

module.exports = Config;
