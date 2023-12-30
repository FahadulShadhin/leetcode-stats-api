const logger = require('../utils/logger');
const LeetCodeGraphQLClient = require('../services/LeetCodeService');
const constructUserData = require('../utils/constructUserData');

const getUserData = async (req, res) => {
	const { leetCodeUsername } = req.params;
	const client = new LeetCodeGraphQLClient();

	try {
		const userProblemsSolvedResponse = await client.userProblemsSolvedQuery(
			leetCodeUsername
		);
		const languageStatsResponse = await client.languageStatsQuery(
			leetCodeUsername
		);
		const rankResponse = await client.userPublicProfileQuery(leetCodeUsername);
		const contestRankingResponse = await client.userContestRankingQuery(
			leetCodeUsername
		);

		const userData = constructUserData(
			userProblemsSolvedResponse.data.data,
			languageStatsResponse.data.data,
			rankResponse.data.data,
			contestRankingResponse.data.data
		);

		if (!userData) {
			logger.info(`${leetCodeUsername} doesn't exist!`);
			return res.status(404).json({
				message: 'not found',
				username: leetCodeUsername,
			});
		}

		logger.info('Successfully retrieved user info...');
		return res.status(200).json({
			message: 'success',
			username: leetCodeUsername,
			data: userData,
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).json({
			message: 'error',
			error: 'Internal Server Error',
		});
	}
};

module.exports = getUserData;
