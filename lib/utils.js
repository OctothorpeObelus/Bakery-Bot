const fs = require("fs")
let lastRand = 0;

module.exports = {
	randInt(max) {
        	return Math.floor(Math.random() * max);
	},
	chooseRandomGuildName() {
		let nameBank = fs.readFileSync("/usr/src/bot/assets/name_pool.txt").toString("UTF8").split("\n");
		let rand = module.exports.randInt(nameBank.length - 1);

		let loopCount = 0
		while (lastRand == rand) {
			rand = module.exports.randInt(nameBank.length - 1);
			loopCount++

			if (loopCount >= 100) break;
		}

		lastRand = rand;
		return nameBank[rand]
	}
}
