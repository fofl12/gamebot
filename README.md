# gamesbot  
A generic bot for Discord guilds that contains a quantity of games

## Usage  
### First-time setup (method 1)  
If you are going to deploy the bot to heroku, you need to use method 2. You must first set up the bot credentials before you can use the bot:
1. make a bot in the discord dev portal
2. invite it to one of your servers
    > **Warning!**  
    > The bot *must* be able to read messages and send messages, otherwise it will not function correctly
3. create a copy of the file `settings.json.def` and call it `settings.json`
4. put the necessary credentials in `settings.json` (guildId is the guild of the server that the bot is going to be used in)
5. register commands

```
npm run registerCommands
```
> **Warning!**  
> You must do this every time you modify the commands in `deploy-commands.js`

### First-time setup (method 2)  
1. Do steps 1 and 2 from the non-heroku setup
2. (if on heroku) Add the following config vars, and fill them in appropriately:
	- TOKEN
	- GUILDID
	- CLIENTID
2. (if not on heroku) Create a .env file, add the variables from above into it and fill them in appropriately
3. Do step 5 from the non-heroku setup

### Running  
just run
```
node .
```

### Activating games
put the names of the games you want to activate in `enabledGames.csv`
> **Warning!**  
> The names of the games must be seperated by a comma

## Troubleshooting 
### Missing dependencies    
if it says something about missing a dependency, just run
```
npm i
```
which will (probably) automatically install all of the dependencies. if it doesn't work, install them by yourself with
```
npm i [package name]
```  

### Error in `config.js`, cannot login or register commands  
this means that you either  

1. haven't made any config file (settings.json or .env)  
2. the credentials are correct  

you must go back to the first time setup and correctly enter the credentials