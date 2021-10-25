const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require("@replit/database");
// noinspection JSValidateTypes
const db = new Database()
///////////////////////////////////////////////////
module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Allows you to change the server\'s configuration')
        .addSubcommand(subcommand =>
            subcommand
                .setName('channel')
                .setDescription('Allows you to set up the channel')
                .addChannelOption(option =>
                    option.setName('channel')
                        .setDescription('The channel you want to use as a welcoming channel')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
             subcommand
                .setName('message')
                .setDescription('Allows you to set up the message to be sent on join/leave')
                .addStringOption(option =>
                    option.setName('message')
                        .setDescription('The channel you want to use as a welcoming channel')
                        .setRequired(false))),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'channel') {
            console.log(interaction.member.permissions.has("ADMINISTRATOR"));
						//CHECK IF USER HAS PERMS//
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
                let channelID = msgchannel.id;
								let serverID = interaction.guild.id
								console.log (serverID)
								// noinspection JSUnusedLocalSymbols
                let key = await db.get(serverID);			await interaction.reply(`Server welcome channel set successfully to <#${key}>`);}
								
            }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
        else if (interaction.options.getSubcommand() === 'message') {
            if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                await interaction.reply('Oi fuck off, get perms')
            }
            if (interaction.member.permissions.has("ADMINISTRATOR")) {
							if (!interaction.options.getString('message')) {
									let serverID = interaction.guild.id;
									let key = await db.get(serverID);
									await interaction.reply(`Server welcome message is set to <#${key}>`)}
							else {
								const msg = interaction.options.getString('message');
                let msgs = msg.string;
								let serverID = interaction.guild.id;
								let serverID2 = "2"+serverID;	
								console.log (msgs);		
								db.set(serverID2, msg).then(() => {});
								// noinspection JSUnusedLocalSymbols
                let key = await db.get(serverID);			await interaction.reply(`Server welcome channel set successfully to <#${key}>`);}
            }
        }
    },
};
