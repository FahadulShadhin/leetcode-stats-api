const express = require('express');
const Config = require('./utils/config');
const getUserData = require('./controllers/index');

Config.connectDB();
const app = express();
const logger = Config.logger();
const variables = Config.variables();
const PORT = variables.port || 3000;

app.get('/', (req, res) => {
	return res.status(200).json({
		status: 'ok',
		message: 'Put your LeetCode username in the url to grab the stats.',
		example: 'https://leetcode-stats-api-url.com/<YOUR_LEETCODE_USERNAME>',
	});
});
app.use('/:leetCodeUsername', getUserData);

app.listen(PORT, () => {
	logger.info(`Server is running on http://localhost:${PORT}`);
});
