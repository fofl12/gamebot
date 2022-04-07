# API reference  
At the moment this is quite a rudimentary API, but if you want to add something, feel free to send a PR! There is an example included in /games/test.js

### `sendMessage (string request, ButtonRow[]? components) -> Message`  
send a message, optionally with components

### `replyToInteraction (Interaction interaction, string request, ButtonRow[]? components) -> Message`  
reply to a specific interaction, optionally with components

### `terminate () -> `  
terminate the game
> **Warning!**  
> This must be used after the game ends, otherwise it may result in memory leaks

### `newButtonRow(Button[] buttons) -> ButtonRow`  
create a new button row with the specified buttons

### `newButton() -> Button`  
create a new button to use in `newButtonRow`