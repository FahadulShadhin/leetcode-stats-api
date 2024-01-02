const Stats = require('../models/statsModel');
const Config = require('../config');

class StatsService {
	constructor(
		leetCodeUsername,
		userProblemsSolvedData,
		languageStatsData,
		rankData,
		contestRankingData
	) {
		this.leetCodeUsername = leetCodeUsername;
		this.userProblemsSolvedData = userProblemsSolvedData;
		this.languageStatsData = languageStatsData;
		this.rankData = rankData;
		this.contestRankingData = contestRankingData;
		this.logger = Config.logger();
	}

	constructUserData() {
		if (
			!this.userProblemsSolvedData.matchedUser ||
			!this.languageStatsData.matchedUser ||
			!this.rankData.matchedUser
		) {
			return null;
		}

		const data = {
			name: this.rankData.matchedUser.profile.realName,
			rank: this.rankData.matchedUser.profile.ranking,
			avater: this.rankData.matchedUser.profile.userAvatar,
			totalProblems: this.userProblemsSolvedData.allQuestionsCount[0].count,
			totalSolved:
				this.userProblemsSolvedData.matchedUser.submitStatsGlobal
					.acSubmissionNum[0].count,
			easy: {
				total: this.userProblemsSolvedData.allQuestionsCount[1].count,
				solved:
					this.userProblemsSolvedData.matchedUser.submitStatsGlobal
						.acSubmissionNum[1].count,
				beatsPercentage:
					this.userProblemsSolvedData.matchedUser.problemsSolvedBeatsStats[0]
						.percentage,
			},
			medium: {
				total: this.userProblemsSolvedData.allQuestionsCount[2].count,
				solved:
					this.userProblemsSolvedData.matchedUser.submitStatsGlobal
						.acSubmissionNum[2].count,
				beatsPercentage:
					this.userProblemsSolvedData.matchedUser.problemsSolvedBeatsStats[1]
						.percentage,
			},
			hard: {
				total: this.userProblemsSolvedData.allQuestionsCount[3].count,
				solved:
					this.userProblemsSolvedData.matchedUser.submitStatsGlobal
						.acSubmissionNum[3].count,
				beatsPercentage:
					this.userProblemsSolvedData.matchedUser.problemsSolvedBeatsStats[0]
						.percentage,
			},
			contestRanking: this.contestRankingData.userContestRanking,
			languageStats: this.languageStatsData.matchedUser.languageProblemCount,
		};

		return data;
	}

	async saveUserStats() {
		const userStatsExists = await Stats.findOne({
			username: this.leetCodeUsername,
		});

		if (userStatsExists) {
			this.logger.info(
				`Stats for ${this.leetCodeUsername} already exists in db.`
			);
			return;
		}

		const newStats = new Stats({
			username: this.leetCodeUsername,
			name: this.rankData.matchedUser.profile.realName,
			rank: this.rankData.matchedUser.profile.ranking,
			avater: this.rankData.matchedUser.profile.userAvatar,
			totalProblems: this.userProblemsSolvedData.allQuestionsCount[0].count,
			totalSolved:
				this.userProblemsSolvedData.matchedUser.submitStatsGlobal
					.acSubmissionNum[0].count,
			easy: {
				total: this.userProblemsSolvedData.allQuestionsCount[1].count,
				solved:
					this.userProblemsSolvedData.matchedUser.submitStatsGlobal
						.acSubmissionNum[1].count,
				beatsPercentage:
					this.userProblemsSolvedData.matchedUser.problemsSolvedBeatsStats[0]
						.percentage,
			},
			medium: {
				total: this.userProblemsSolvedData.allQuestionsCount[2].count,
				solved:
					this.userProblemsSolvedData.matchedUser.submitStatsGlobal
						.acSubmissionNum[2].count,
				beatsPercentage:
					this.userProblemsSolvedData.matchedUser.problemsSolvedBeatsStats[1]
						.percentage,
			},
			hard: {
				total: this.userProblemsSolvedData.allQuestionsCount[3].count,
				solved:
					this.userProblemsSolvedData.matchedUser.submitStatsGlobal
						.acSubmissionNum[3].count,
				beatsPercentage:
					this.userProblemsSolvedData.matchedUser.problemsSolvedBeatsStats[0]
						.percentage,
			},
			contestRanking: this.contestRankingData.userContestRanking,
			languageStats: this.languageStatsData.matchedUser.languageProblemCount,
		});

		try {
			await newStats.save();
			this.logger.info('Stats saved successfully to db.');
		} catch (error) {
			this.logger.error('Problem while saving stats to db.');
		}
	}
}

module.exports = StatsService;
