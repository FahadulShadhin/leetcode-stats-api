require('dotenv').config();
const winston = require('winston');

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
		const port = process.env.PORT;
		return {
			leetcodeGraphqlEndpoint,
			port,
		};
	}
}

module.exports = Config;
