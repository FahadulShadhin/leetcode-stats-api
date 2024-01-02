const Stats = require('../models/statsModel');

const saveUserStats = async (
	leetCodeUsername,
	userProblemsSolvedData,
	languageStatsData,
	rankData,
	contestRankingData
) => {
	if (
		!userProblemsSolvedData.matchedUser ||
		!languageStatsData.matchedUser ||
		!rankData.matchedUser
	) {
		return null;
	}

	const newStats = new Stats({
		username: leetCodeUsername,
		name: rankData.matchedUser.profile.realName,
		rank: rankData.matchedUser.profile.ranking,
		avater: rankData.matchedUser.profile.userAvatar,
		totalProblems: userProblemsSolvedData.allQuestionsCount[0].count,
		totalSolved:
			userProblemsSolvedData.matchedUser.submitStatsGlobal.acSubmissionNum[0]
				.count,
		easy: {
			total: userProblemsSolvedData.allQuestionsCount[1].count,
			solved:
				userProblemsSolvedData.matchedUser.submitStatsGlobal.acSubmissionNum[1]
					.count,
			beatsPercentage:
				userProblemsSolvedData.matchedUser.problemsSolvedBeatsStats[0]
					.percentage,
		},
		medium: {
			total: userProblemsSolvedData.allQuestionsCount[2].count,
			solved:
				userProblemsSolvedData.matchedUser.submitStatsGlobal.acSubmissionNum[2]
					.count,
			beatsPercentage:
				userProblemsSolvedData.matchedUser.problemsSolvedBeatsStats[1]
					.percentage,
		},
		hard: {
			total: userProblemsSolvedData.allQuestionsCount[3].count,
			solved:
				userProblemsSolvedData.matchedUser.submitStatsGlobal.acSubmissionNum[3]
					.count,
			beatsPercentage:
				userProblemsSolvedData.matchedUser.problemsSolvedBeatsStats[0]
					.percentage,
		},
		contestRanking: contestRankingData.userContestRanking,
		languageStats: languageStatsData.matchedUser.languageProblemCount,
	});

	return await newStats.save();
};

module.exports = saveUserStats;
