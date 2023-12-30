const express = require('express');
const logger = require('./utils/logger');
const getUserData = require('./controllers/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/:leetCodeUsername', getUserData);

app.listen(PORT, () => {
	logger.info(`Server is running on http://localhost:${PORT}`);
});
