/////////////////ND Modules///////////////////
// noinspection JSUnusedLocalSymbols,JSCheckFunctionSignatures,JSIgnoredPromiseFromCall,JSValidateTypes,JSUnresolvedFunction
// noinspection JSCheckFunctionSignatures
let date_ob = new Date();
const fs = require('fs');
const random = require('random');
const Sequelize = require('sequelize');
const Database = require("@replit/database");
const db = new Database();
/////////////////Discord Modules///////////////////
const { Client, Collection, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
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
client.on("guildMemberAdd", async (member) => {			let serverID = member.guild.id;
		let username = member.user.username;
				let chn = await db.get(serverID)
				if (!chn) {let channel = "0"}
		const channel = client.channels.cache.get(chn);	
		let serverID2 = "2" + serverID;
				let title = await db.get(serverID2);
				if (!title) {let title = "Welcome"}
		let serverID3 = "3" + serverID;
				let subtitle = await db.get(serverID3);
				if (!title) {let subtitle = "or something idk"}
		let serverID5 = "5" + serverID;
				let image = await db.get(serverID5);
				if (!image) {let image = ""}
			let date = ("0" + date_ob.getDate()).slice(-2);
			let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
			let year = date_ob.getFullYear();
			let hours = date_ob.getHours();
			let minutes = date_ob.getMinutes();
			let seconds = date_ob.getSeconds();
		let time = (date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds)
	let welcomembed =  new MessageEmbed()
	.setColor('#8abbdc')
	.setTitle(title)
	.setDescription(subtitle + username)
	.setImage(image)
	.setTimestamp(time)
	.setFooter('Made with DW(m)B. Run /invite! | Sent at ' + time);

channel.send({ embeds: [welcomembed] });
	})
/////////////////LogMeIntoDiscordAndBeyond//////////////
// noinspection JSIgnoredPromiseFromCall
client.login(token);