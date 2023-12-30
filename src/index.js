const express = require('express');
const logger = require('./config/logger');
const getUserStatus = require('./controllers/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/:leetCodeUsername', getUserStatus);

app.listen(PORT, () => {
	logger.info(`Server is running on http://localhost:${PORT}`);
});
