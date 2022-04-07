const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	desc: "Rock paper scissor",
	boot: api => {
		const buttonRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('rock')
					.setLabel('Rock')
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('paper')
					.setLabel('Paper')
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('scissor')
					.setLabel('Scissors')
					.setStyle('SECONDARY'),
			);
		api.sendMessage(`${api.user} Select your selection:`, [buttonRow])
	},
	interact: (api, interaction) => {
		let selection;
		switch (interaction.customId) {
			case "rock":
				selection = 1
				break
			case "paper":
				selection = 2
				break
			case "scissor":
				selection = 3
				break
		}
		const mySelection = Math.floor(Math.random() * 3 + 1);
		if (mySelection - 1 === selection || (mySelection === 1 && selection === 3)) {
			api.replyToInteraction(interaction, `I win! You selected ${interaction.customId}. I selected ${mySelection == 1 ? 'rock' : (mySelection == 2 ? 'paper' : 'scissors')}`)
		} else if (mySelection === selection) {
			api.replyToInteraction(interaction, `Tie! You selected ${interaction.customId}`)
		} else {
			api.replyToInteraction(interaction, `You win! You selected ${interaction.customId}. I selected ${mySelection == 1 ? 'rock' : (mySelection == 2 ? 'paper' : 'scissors')}`)
		}
		api.terminate()
	}
}