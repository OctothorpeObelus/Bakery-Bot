const { Events } = require('discord.js');
const utils = require("../lib/utils.js");
let lastDate = new Date()

module.exports = {
	name: Events.MessageCreate,
	once: false,
	execute(message) {
		let date = new Date();

		if (date.getDay() != lastDate.getDay()) {
			let newName = utils.chooseRandomGuildName()
			console.log("[" + new Date() + "] Changing guild name to '" + newName + "'");
			lastDate = new Date();
			message.guild.setName(newName()); //Make it change the guild name when the day changes
		}
	},
};
