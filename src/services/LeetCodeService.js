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

	async languageStats(leetcodeUsername) {
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
}

module.exports = LeetCodeGraphQLClient;
