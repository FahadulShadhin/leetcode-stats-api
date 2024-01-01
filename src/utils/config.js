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
}

// const logger = winston.createLogger({
// 	level: 'info',
// 	format: winston.format.json(),
// 	transports: [
// 		new winston.transports.Console({ format: winston.format.simple() }),
// 	],
// });

module.exports = Config;
