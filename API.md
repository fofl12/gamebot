# API reference  
At the moment this is quite a rudimentary API, but if you want to add something, feel free to send a PR! There is an example included in /games/test.js

### `async sendMessage (string request, ButtonRow[]? components) -> Message`  
send a message, optionally with components

### `async replyToInteraction (Interaction interaction, string request, ButtonRow[]? components) -> Message`  
reply to a specific interaction, optionally with components

### `terminate () -> `  
terminate the game
> **Warning!**  
> This must be used after the game ends, otherwise it may result in memory leaks