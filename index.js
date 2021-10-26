/////////////////ND Modules///////////////////
// noinspection JSUnusedLocalSymbols,JSCheckFunctionSignatures,JSIgnoredPromiseFromCall,JSValidateTypes,JSUnresolvedFunction
// noinspection JSCheckFunctionSignatures
const fs = require('fs');
const random = require('random');
const Sequelize = require('sequelize');
const Database = require("@replit/database");
const db = new Database();
const { welcomeImage } = require('discord-welcome-card');
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
/////////////////Once events///////////////////
client.once('ready', () => {
    console.log('Syncing tags');
		console.log('Totally real loading: 100%');
		console.log('Definitely real load complete!');
		    console.log('Discord bot ready and logged in!');
		});
client.once('reconnecting', () => {
    console.log('Gimme a sec.');
});
client.once('disconnect', () => {
    console.log('Whoopsie doodles! Something went wrong. Wohowo.');
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
///////////////////Actual welcome function///////////////////////////
client.on("messageCreate", async message => {
    if(message.author.bot) return
    //Generating the actual custom Card
    const image = await drawCard({
        theme: "circuit",
        text: {
            title: 'Hello',
            text: message.author.tag,
            subtitle: 'please read the Rules',
            color: `#88f`
        },
        avatar: {
            image: message.author.displayAvatarURL({ format: 'png' }),
            outlineWidth: 5,
            outlineColor: new Gradient('linear',
                [0, '#33f'],
                [1, '#f33']
            ),
        },
        background: 'https://i.imgur.com/ea9PB3H.png',
        blur: 1,
        border: true,
        rounded: true
    });

    message.channel.send({ files: [ image ] })
});
/////////////////LogMeIntoDiscordAndBeyond//////////////
// noinspection JSIgnoredPromiseFromCall
client.login(token);