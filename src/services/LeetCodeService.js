const axios = require('axios');

class LeetCodeGraphQLClient {
	constructor() {
		this.graphqlEndpoint = 'https://leetcode.com/graphql';
	}

	async sendGraphQLRequest(query, variables) {
		return await axios.post(this.graphqlEndpoint, {
			query: query,
			variables: variables,
		});
	}

	async userProblemsSolvedQuery(leetcodeUsername) {
		const query = `
      query userProblemsSolved($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          problemsSolvedBeatsStats {
            difficulty
            percentage
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

		return await this.sendGraphQLRequest(query, {
			username: leetcodeUsername,
		});
	}

	async languageStatsQuery(leetcodeUsername) {
		const query = `
      query languageStats($username: String!) {
        matchedUser(username: $username) {
          languageProblemCount {
            languageName
            problemsSolved
          }
        }
      }
    `;

		return await this.sendGraphQLRequest(query, {
			username: leetcodeUsername,
		});
	}

	async userPublicProfileQuery(leetcodeUsername) {
		const query = `
      query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
          profile {
            ranking
            userAvatar
            realName
          }
        }
      }  
    `;

		return await this.sendGraphQLRequest(query, {
			username: leetcodeUsername,
		});
	}

	async userContestRankingQuery(leetcodeUsername) {
		const query = `
      query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          totalParticipants
          topPercentage
          badge {
            name
          }
        }
      }
    `;

		return await this.sendGraphQLRequest(query, {
			username: leetcodeUsername,
		});
	}
}

module.exports = LeetCodeGraphQLClient;
