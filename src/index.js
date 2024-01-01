const express = require('express');
const Config = require('./utils/config');
const getUserData = require('./controllers/index');

const app = express();
const PORT = process.env.PORT || 3000;
const logger = Config.logger();

app.use('/:leetCodeUsername', getUserData);

app.listen(PORT, () => {
	logger.info(`Server is running on http://localhost:${PORT}`);
});
