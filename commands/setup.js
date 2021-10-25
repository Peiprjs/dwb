const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require("@replit/database");
// noinspection JSValidateTypes
const db = new Database()
module.exports = {
///////////////////SLASHIE BUILDER//////////////////////
	    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Allows you to change the server\'s configuration')
				//SUBCOMMAND CHANNEL//
        .addSubcommand(subcommand =>
            subcommand
                .setName('channel')
                .setDescription('Allows you to set up the channel')
                .addChannelOption(option =>
                    option.setName('channel')
                        .setDescription('The channel you want to use as a welcoming channel')
                        .setRequired(false)))
				//SUBCOMMAND MESSAGE//
        .addSubcommand(subcommand =>
             subcommand
                .setName('message')
                .setDescription('Allows you to set up the message to be sent on join/leave')
                .addStringOption(option =>
                    option.setName('message')
                        .setDescription('The channel you want to use as a welcoming channel')
                        .setRequired(false))),
////////////////////////SET_CHN/////////////////////////
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'channel') {
            console.log(interaction.member.permissions.has("ADMINISTRATOR"));
            if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                await interaction.reply('Oi fuck off, get perms')
            }
            if (interaction.member.permissions.has("ADMINISTRATOR")) {
                if (!interaction.options.getChannel('channel')) {
									let serverID = interaction.guild.id;
									let key = await db.get(serverID);
									await interaction.reply(`Server welcome channel is set to <#${key}>`)}
								else {
								const msgchannel = interaction.options.getChannel('channel');
                // noinspection JSUnusedLocalSymbols
                let channelID = msgchannel.id;
								let serverID = interaction.guild.id
								// noinspection JSUnusedLocalSymbols
                let key = await db.get(serverID);	
								if (key == channelID) {
								await interaction.reply(`Server welcome channel set successfully to <#${key}>`);;}
								else {await interaction.reply('Whoopsie noodles, something went wrong baboom try againa latera')}
}
								
            }
        }
////////////////////////SET_MSG/////////////////////////
        else if (interaction.options.getSubcommand() === 'message') {
            if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                await interaction.reply('Oi fuck off, get perms')
            }
            if (interaction.member.permissions.has("ADMINISTRATOR")) {
							if (!interaction.options.getString('message')) {
								let serverID = interaction.guild.id;
								let serverID2 = "2"+serverID;
								let key = await db.get(serverID2);
								await interaction.reply(`Server welcome message is set to "${key}"`)}
							else {
								const msg = interaction.options.getString('message');
                let msgs = msg.string;
								let serverID = interaction.guild.id;
								let serverID2 = "2"+serverID;	
								db.set(serverID2, msg).then(() => {});
								// noinspection JSUnusedLocalSymbols
                let key = await db.get(serverID2);
								if (key == msg) {
								await interaction.reply(`Server welcome channel set successfully to "${key}"`);}
								else {await interaction.reply('Whoopsie noodles, something went wrong baboom try againa latera')}} 
            }
        }
    },
};
