// Events:
// - boot: As soon as command started running
// - interact: Whenever interaction occurs (must be exposed if you use interactions)
// Properties:
// - desc: Description for use in %info
// Api is described somewhere idk figure it out
// You can also import stuff by require()ing discord.js

module.exports = {
	desc: "Test",
	boot: api => {
		api.sendMessage(':moyai:')
		api.terminate()
	}
}