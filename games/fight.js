const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const enemies = [
	{
		name: 'Iceman Joe',
		hp: 25,
		speed: 5,
		attack: 4,
		color: '#1d2b53',
		dialog: [
			'noob!',
			'Acquire skill',
			'no.',
			'ow',
			'stop attacking or i report you to Discord!',
			'you are incredibly slow...'
		]
	},
	{
		name: 'Fireman John',
		hp: 24,
		speed: 4,
		attack: 6,
		color: '#ff004d',
		dialog: [
			'ow',
			'why are you so bad at Attacking...',
			'stop being so fast!!!! or i am will report you!!!',
			'acquire skill please',
			'NOOO',
			'hahahaha',
			'nob'
		]
	}
]

function assembleEmbed(enemyHp, enemy, myHp) {
	return new MessageEmbed()
		.setTitle('Fight')
		.setDescription('currently fighting ' + enemy.name)
		.setColor(enemy.color)
		.addFields(
			{ name: 'Player Stats', value: `HP: ${myHp}\nATK: 5\nSPD: 5` },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Enemy Stats', value: `HP: ${enemyHp}\nATK: ${enemy.attack}\nSPD: ${enemy.speed}`, inline: true },
			{ name: 'Enemy Dialog', value: enemy.dialog[Math.floor(Math.random() * enemy.dialog.length)], inline: true }
		)
}

let enemy; let enemyHp; let myHp;

module.exports = {
	desc: "Fight against a random NPC",
	boot: api => {
		const buttonRow = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('attack')
					.setLabel('Attack')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId('parry')
					.setLabel('Parry')
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('heal')
					.setLabel('Heal')
					.setStyle('PRIMARY'),
			);
		enemy = enemies[Math.floor(Math.random() * enemies.length)]
		enemyHp = enemy.hp
		myHp = 20
		api.sendEmbed(assembleEmbed(enemyHp, enemy, myHp), [buttonRow])
	},
	interact: (api, interaction) => {
		const enemyAction = Math.floor(Math.random() * 2);
		let enemySuccessful = true;
		let playerSuccessful = true;
		switch (interaction.customId) {
			case "parry":
				if (enemyAction === 0) {
					enemySuccessful = Math.random() > 0.6 ? false : true
				}
				break
			case "heal":
				myHp += Math.floor(Math.random() * 4)
				break
		}
		switch (enemyAction) {
			case 0:
				if (enemySuccessful) {
					myHp -= enemy.attack
				}
				break
			case 1:
				enemyHp += Math.floor(Math.random() * 4)
		}
		if (enemy.speed > 5) {
			playerSuccessful = Math.random() > (0.90 - ((enemy.speed - 5) * 0.2)) ? false : true
		} else {
			enemySuccessful = Math.random() > (0.90 - ((5 - enemy.speed) * 0.2)) ? false : true
		}
		if (playerSuccessful && interaction.customId === 'attack') {
			enemyHp -= 5
		}
		interaction.message.edit({ embeds: [assembleEmbed(enemyHp, enemy, myHp)] })
		if (enemyHp <= 0 || myHp <= 0) {
			api.replyToInteraction(interaction, `Game over, ${enemyHp <= 0 ? 'you' : 'the enemy'} won`)
			api.terminate()
		} else {
			interaction.reply('Advanced')
			interaction.deleteReply()
		}
	}
}