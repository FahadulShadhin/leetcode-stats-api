const logger = require('../config/logger');
const LeetCodeGraphQLClient = require('../services/LeetCodeService');

const getUserData = async (req, res) => {
	const { leetCodeUsername } = req.params;
	const client = new LeetCodeGraphQLClient();

	try {
		const userProblemsSolvedResponse = await client.userProblemsSolvedQuery(
			leetCodeUsername
		);
		const languageStatsResponse = await client.languageStats(leetCodeUsername);

		const data = {
			userProblemsSolvedData: userProblemsSolvedResponse.data.data,
			languageStatsData: languageStatsResponse.data.data,
		};

		logger.info('Successfully retrieved user info...');
		res.status(200).json({
			message: 'Success',
			data: data,
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = getUserData;
