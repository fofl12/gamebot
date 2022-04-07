let config = {}
try {
	config = require('./settings.json')
} catch {
	config = {
		token: process.env.TOKEN | "???????",
		clientId: process.env.CLIENTID | "????????",
		guildId: process.env.GUILDID | "????????"
	}
}
module.exports = config