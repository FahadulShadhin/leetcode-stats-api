# LeetCode Stats API

API to grab your LeetCode profile stats

## Setup:

- Built with node==18.18.2 & yarn==1.22.21
- Clone the repository
- cd to root
- Install the dependencies: `yarn install`
- `.env` example:

```
LEETCODE_GRAPHQL_ENDPOINT=https://leetcode.com/graphql
MONGO_URL=<your_mongodb_connection_string>
PORT=3000
```

- Start the server: `yarn dev`

## Endpoint:

| Method | URL                         | Description                           |
| ------ | --------------------------- | ------------------------------------- |
| GET    | `/<your_leetcode_username>` | Returns your LeetCode user statistics |

## Example:

- Endpoint: http://localhost:3000/shadhin17
- Response:

```javascript
{
	"status": "success",
	"message": "shadhin17 found!",
	"data": {
		"name": "Fahadul Shadhin",
		"rank": 294696,
		"avater": "https://assets.leetcode.com/users/avatars/avatar_1688419473.png",
		"totalProblems": 3025,
		"totalSolved": 243,
		"easy": { "total": 776, "solved": 152, "beatsPercentage": 96.11 },
		"medium": { "total": 1587, "solved": 90, "beatsPercentage": 84.56 },
		"hard": { "total": 662, "solved": 1, "beatsPercentage": 96.11 },
		"contestRanking": null,
		"languageStats": [
			{ "languageName": "C++", "problemsSolved": 60 },
			{ "languageName": "Java", "problemsSolved": 3 },
			{ "languageName": "MySQL", "problemsSolved": 21 },
			{ "languageName": "C", "problemsSolved": 3 },
			{ "languageName": "JavaScript", "problemsSolved": 40 },
			{ "languageName": "Python3", "problemsSolved": 160 },
			{ "languageName": "TypeScript", "problemsSolved": 1 }
		]
	}
}
```
