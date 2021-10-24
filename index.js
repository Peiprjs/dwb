/////////////////ND Modules///////////////////
// noinspection JSUnusedLocalSymbols,JSCheckFunctionSignatures,JSIgnoredPromiseFromCall
// noinspection JSCheckFunctionSignatures
const fs = require('fs');
const random = require('random')
/////////////////Discord Modules///////////////////
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    disableMentions: 'everyone',
});
/////////////////Command collection///////////////////
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}
/////////////////Once ready///////////////////
client.once('ready', () => {
    console.log('Discord bot ready and logged in!');
});
client.once('reconnecting', () => {
    console.log('Gimme a sec.');
});
client.once('disconnect', () => {
    console.log('Bye bitch');
});
/////////////////Once interaction///////////////////
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    // noinspection JSUnresolvedVariable
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        //Self-respect 100//
        // noinspection JSUnresolvedFunction
        await interaction.reply({ content: `Whoopsies! Something broke. Dev's probably being stupid, AGAIN`, ephemeral: true });
    }
});
/////////////////LogMeIntoDiscordAndBeyond///////////////////
// noinspection JSIgnoredPromiseFromCall
client.login(token);