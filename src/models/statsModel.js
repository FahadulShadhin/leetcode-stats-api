const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema(
	{
		name: String,
		rank: Number,
		avatar: String,
		totalProblems: Number,
		totalSolved: Number,
		easy: {
			total: Number,
			solved: Number,
			beatsPercentage: Number,
		},
		medium: {
			total: Number,
			solved: Number,
			beatsPercentage: Number,
		},
		hard: {
			total: Number,
			solved: Number,
			beatsPercentage: Number,
		},
		languageStats: [
			{
				languageName: String,
				problemsSolved: Number,
			},
		],
	},
	{
		timestamps: true,
	}
);

const StatsModel = mongoose.model('Stats', statsSchema);

module.exports = StatsModel;
