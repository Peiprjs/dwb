const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require("@replit/database");
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
                const msgchannel = interaction.options.getChannel('channel');
                let channelID = msgchannel.id;
								let serverID = interaction.guild.id
								console.log (serverID)
								let key = await db.get(serverID);			await interaction.reply(`Server welcome channel set successfully to <#${channelID}>`);
								if (!interaction.options.getChannel('channel')) {console.log ('empty')}
            }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
        else if (interaction.options.getSubcommand() === 'message') {
            if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                await interaction.reply('Oi fuck off, get perms')
            }
            if (interaction.member.permissions.has("ADMINISTRATOR")) {
                const msg = interaction.options.getString('message');
                await interaction.reply(`Server welcome message successfully set to "${msg}"`)
            }
        }
    },
};
