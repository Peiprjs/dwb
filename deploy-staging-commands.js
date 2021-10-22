/////////////////Modules///////////////////
// noinspection JSClosureCompilerSyntax,JSUnusedLocalSymbols,DuplicatedCode,JSCheckFunctionSignatures

const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
/////////////////Commands definition///////////////////
const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}
/////////////////HTTP Push///////////////////
const rest = new REST({ version: '9' }).setToken(token);
console.log(commands.length)
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

