const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./loadConfig.js');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Ping bot'),
	new SlashCommandBuilder().setName('game').setDescription('play game').addStringOption(option =>
		option.setName('name').setDescription('The name of the game').setRequired(true)),
	new SlashCommandBuilder().setName('info').setDescription('info about a game').addStringOption(option =>
			option.setName('name').setDescription('The name of the game').setRequired(true)),
	new SlashCommandBuilder().setName('list').setDescription('list activated games')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Registered commands'))
	.catch(console.error);