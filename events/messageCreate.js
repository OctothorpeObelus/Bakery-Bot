let lastDate = new Date()

module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message) {
		let date = new Date();

        //if (date.getDay() != lastDate.getDay()) {
            lastDate = new Date();
            message.guild.name = "Tank Depot"; //Make it change the guild name when the day changes
        //}
	},
};