const express = require('express');
const axios = require('axios');
const logger = require('./config/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/:leetcodeUsername', async (req, res) => {
	const { leetcodeUsername } = req.params;

	try {
		const response = await axios.post('https://leetcode.com/graphql', {
			query: `
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
      `,
			variables: { username: leetcodeUsername },
		});

		const data = response.data.data;
		logger.info('Success!');
		res.json(data);
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.listen(PORT, () => {
	logger.info(`Server is running on http://localhost:${PORT}`);
});
