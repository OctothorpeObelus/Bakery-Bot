const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    // Build the new slash command.
	data: new SlashCommandBuilder()
		.setName('addguildname')
		.setDescription('Add a name to the guild name pool.')
		.setDefaultMemberPermissions(0)
		.addStringOption(option =>
		option.setName('name')
			.setRequired(true)
			.setDescription('The name to add to the pool.')),

    // The reaction to the command being run.
	async execute(interaction) {
		let name = interaction.options.getString('name');
		let user = await interaction.guild.members.fetch(interaction.user.id);
		let username = user.user.globalName;
		let namePool = fs.readFileSync("/usr/src/bot/assets/name_pool.txt").toString("UTF8").split("\n")

		for (const item of namePool) {
			if (item == name) {
				await interaction.reply({content: "That name is already in the name pool!", ephemeral: true});
				return;
			}
		}

		fs.appendFileSync("/usr/src/bot/assets/name_pool.txt", name + "\n");

		console.log("[" + new Date() + "] " + username + " added '" + name + "' to the name pool.");
		await interaction.reply({content: "Added '" + name + "' to the guild name pool!", ephemeral: true})
	},
};
