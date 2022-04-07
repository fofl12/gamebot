const { Client, Intents, MessageActionRow, MessageButton } = require('discord.js');
const { dashboardPort, token } = require('./settings.json');
const fs = require('fs'); // for reading enabledGames.csv
const { findSourceMap } = require('module');

const tasks = [];

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', c => {
    console.log('Ready');
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) {
		const task = tasks.find(element => element.checkIfLatestMessage(interaction.message));
		if (task) {
			task.loaded.interact(task.api, interaction)
		} else {
			return
		}
	}

    const { commandName } = interaction;

    switch (commandName) {
        case "ping":
            await interaction.reply('Pong');
            break
        case "game":
			try {
				if (!fs.readFileSync('./enabledGames.csv', 'utf8').includes(interaction.options.getString('name'))) {
					throw new Error('attempt to play non-activated game')
				}
				interaction.reply(`Loading ${interaction.options.getString('name')}...`)
				let latestMessage = null;
				let task = {
					loaded: require(`./games/${interaction.options.getString('name')}.js`),
					checkIfLatestMessage: (query) => {
						return latestMessage === query
					},
					api: {
						sendMessage: (request, components) => {
							let message;
							if (components) {
								message = await interaction.channel.send({ content: request, components: [components] })
							} else {
								message = await interaction.channel.send(request);
							}
							latestMessage = message;
							return message;
						},
						replyToInteraction: (interaction, request, components) => {
							let message;
							if (components) {
								message = interaction.reply({ content: request, components: components})
							} else {
								interaction.reply(request)
							}
							latestMessage = message;
							return message
						},
						terminate: () => {
							tasks.splice(tasks.indexOf(task), 1);
							task = null
						},
						newButtonRow: buttons => {
							return new MessageActionRow().addComponents(buttons)
						},
						newButton: () => {
							return new MessageButton()
						},
						user: interaction.user
					}
				}
				tasks.push(task);
				task.loaded.boot(task.api);
			} catch (err) {
				console.log(err);
				interaction.channel.send(`something has occurred???? ${interaction.user}`);
			}
            break
		case "info":
			try {
				if (!fs.readFileSync('./enabledGames.csv', 'utf8').includes(interaction.options.getString('name'))) {
					throw new Error('attempt to play non-activated game')
				}
				interaction.reply(require(`./games/${interaction.options.getString('name')}.js`).desc);
			} catch (err) {
				console.log(err);
				interaction.channel.send(`something has occurred???? ${interaction.user}`);
			}
            break
        case "list":
            await interaction.reply('activated games : ' + fs.readFileSync('./enabledGames.csv', 'utf8'));
            break
    }
})

client.login(token);