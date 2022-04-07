let config = {}
try {
	config = require('./config.json')
} catch {
	config = {
		token: process.env.TOKEN | "???????",
		clientId: process.env.CLIENTID | "????????",
		guildId: process.env.GUILDID | "????????"
	}
}
module.exports = config