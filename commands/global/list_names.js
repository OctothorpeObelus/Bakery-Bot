const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

function getMessageEmbed(page) {
	let namePool = fs.readFileSync("/usr/src/bot/assets/name_pool.txt").toString("UTF8").split("\n")
	let namesPerPage = 10
	let str = ""
	let info = "Showing " + (page * namesPerPage + 1) + "-" + Math.min(namePool.length - 1, (page + 1) * namesPerPage) + " of " + (namePool.length - 1);

	//Build the list of guild names
	for (var I = page * namesPerPage; I < Math.min(namePool.length - 1, (page + 1) * namesPerPage); I++) {
		str = str + (I + 1) + ") " + namePool[I] + "\n";
	}

	const msgEmbed = new EmbedBuilder()
		.setTitle("Guild Name Pool List")
		.setDescription("A list of all possible guild names for the bot to pick from every day.")
		.addFields({ name: info, value: str })
		.setTimestamp()
		.setFooter({ text: "Made by func_octo", iconURL: "https://octo.tf/share/04-2024/LOGO_SERVAL.png" })

	// Buttons
	const next = new ButtonBuilder()
		.setCustomId("next")
		.setLabel("Next Page")
		.setStyle(ButtonStyle.Primary)
		.setDisabled(((page + 1) * namesPerPage >= namePool.length - 1) ? true : false);

	const prev = new ButtonBuilder()
		.setCustomId("prev")
		.setLabel("Prev. Page")
		.setStyle(ButtonStyle.Primary)
		.setDisabled((page == 0) ? true : false);

	let buttons = new ActionRowBuilder()
		.addComponents(prev, next);

	return [msgEmbed, buttons]
}

module.exports = {
    // Build the new slash command.
	data: new SlashCommandBuilder()
		.setName('listguildnames')
		.setDescription('Lists out the name pool for the guild.')
		.setDefaultMemberPermissions(0),

    // The reaction to the command being run.
	async execute(interaction) {
		let page = 0
		let name = interaction.options.getString('name');
		let user = await interaction.guild.members.fetch(interaction.user.id);
		let username = user.user.globalName;

		let msg = getMessageEmbed(page)
		let embed = msg[0]
		let buttons = msg[1]

		let message = await interaction.reply({ embeds: [embed], components: [buttons], ephemeral: true })
		let messageID = message.id
		const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 3_600_000 });

		collector.on("collect", async i => {
			const msgID = i.message.id;
			const button = i.customId;

			if (button == "next") {
				page++;
			} else if (button == "prev") {
				page--;
			}

			let msg = getMessageEmbed(page);
			let embed = msg[0];
			let buttons = msg[1];
			i.update({ embeds: [embed], components: [buttons] });
		});
	},
};
