# gamesbot  
A generic bot for Discord guilds that contains a quantity of games

## Usage  
### First-time setup  
You must first set up the bot credentials before you can use the bot:
1. make a bot in the discord dev portal
2. invite it to one of your servers
    > **Warning!**  
    > The bot *must* be able to read messages and send messages, otherwise it will not function correctly
3. create a copy of the file `settings.json.def` and call it `settings.json`
4. put the necessary credentials in `settings.json` (guildId is the guild of the server that the bot is going to be used in)

### Running  
just run
```
npm init
```

### Activating games
put the games you want to activate in `enabledGames.csv`
> **Warning!**  
> The names of the games must be seperated by a comma

### Troubleshooting  
if it says something about missing a dependency, just run
```
npm i
```
which will (probably) automatically install all of the dependencies. if it doesn't work, install them by yourself with
```
npm i [package name]
```