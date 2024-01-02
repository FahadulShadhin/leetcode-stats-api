const Config = require('../config');
const LeetCodeGraphQLClient = require('../services/LeetCodeService');
const StatsService = require('../services/StatsService');

const getUserData = async (req, res) => {
	const { leetCodeUsername } = req.params;
	const client = new LeetCodeGraphQLClient();
	const logger = Config.logger();

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

		const statsService = new StatsService(
			leetCodeUsername,
			userProblemsSolvedResponse.data.data,
			languageStatsResponse.data.data,
			rankResponse.data.data,
			contestRankingResponse.data.data
		);

		const userData = statsService.constructUserData();

		if (!userData) {
			logger.info(`${leetCodeUsername} doesn't exist!`);
			return res.status(404).json({
				status: 'not found',
				message: `${leetCodeUsername} doesn't exist.`,
			});
		}

		logger.info('Successfully retrieved user info...');
		await statsService.saveUserStats();

		return res.status(200).json({
			status: 'success',
			message: `${leetCodeUsername} found!`,
			data: userData,
		});
	} catch (error) {
		logger.error(error.message);
		return res.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
		});
	}
};

module.exports = getUserData;
