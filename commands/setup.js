const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const Database = require("@replit/database");
// noinspection JSValidateTypes
const db = new Database()
let validUrl = require('valid-url');
// noinspection JSUnresolvedFunction
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
        //SUBCOMMAND TITLE//
        .addSubcommand(subcommand =>
            subcommand
            .setName('title')
            .setDescription('Allows you to set up the title of the card to be sent on join/leave')
            .addStringOption(option =>
                option.setName('title')
                .setDescription('The title of the welcome card')
                .setRequired(false)))
        //SUBCOMMAND SUBTITLE//
        .addSubcommand(subcommand =>
            subcommand
            .setName('subtitle')
            .setDescription('Allows you to set up the subtitle of the card to be sent on join/leave')
            .addStringOption(option =>
                option.setName('message')
                .setDescription('The message you want to use as a 	subtitle of the welcome card	')
                .setRequired(false)))
        //SUBCOMMAND  IMAGE//
        .addSubcommand(subcommand =>
            subcommand
            .setName('image')
            .setDescription('Allows you to set up the banner image of the card to be sent on join/leave')
            .addStringOption(option =>
                option.setName('link')
                .setDescription('The direct link to the image you want to use (the link should end with .png or .jpeg).')
                .setRequired(false))),
////////////////////////SET_CHN/////////////////////////
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'channel') {
            if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                await interaction.reply('Oi fuck off, get perms')
            }
            if (interaction.member.permissions.has("ADMINISTRATOR")) {
                if (!interaction.options.getChannel('channel')) {
                    let serverID = interaction.guild.id;
                    let key = await db.get(serverID);
                    await interaction.reply(`Server welcome channel is set to <#${key}>`)
                } else {
                    const msgchannel = interaction.options.getChannel('channel');
                    // noinspection JSUnusedLocalSymbols
                    let channelID = msgchannel.id;
										let serverID = interaction.guild.id

                    db.set(serverID, channelID).then(() => {});
                    // noinspection JSUnusedLocalSymbols
                    let key = await db.get(serverID);
                    if (key === channelID) {
                        await interaction.reply(`Server welcome channel set successfully to <#${key}>`);
                    } else {
                        await interaction.reply('Whoopsie noodles, something went wrong baboom try againa latera')
												console.log("Database error bro")
                    }
                }

            }
        }
////////////////////////SET_TIT/////////////////////////
        else if (interaction.options.getSubcommand() === 'title') {
            if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                await interaction.reply('Oi fuck off, get perms')
            }
            if (interaction.member.permissions.has("ADMINISTRATOR")) {
                if (!interaction.options.getString('message')) {
                    let serverID = interaction.guild.id;
                    let serverID2 = "2" + serverID;
                    let key = await db.get(serverID2);
                    await interaction.reply(`Server welcome title is set to "${key}"`)
                } else {
                    const msg = interaction.options.getString('message');
                    let serverID = interaction.guild.id;
                    let serverID2 = "2" + serverID;
                    db.set(serverID2, msg).then(() => {});
                    // noinspection JSUnusedLocalSymbols
                    let key = await db.get(serverID2);
                    if (key === msg) {
                        await interaction.reply(`Server welcome title set successfully to "${key}"`);
                    } else {
                        await interaction.reply('Whoopsie noodles, something went wrong baboom try againa latera')
												console.log("Database error bro")
                    }
                }
            }
        }
////////////////////////SET_SUB/////////////////////////
        else if (interaction.options.getSubcommand() === 'subtitle') {
            if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                await interaction.reply('Oi fuck off, get perms')
            }
            if (interaction.member.permissions.has("ADMINISTRATOR")) {
                if (!interaction.options.getString('message')) {
                    let serverID = interaction.guild.id;
                    let serverID2 = "3" + serverID;
                    let key = await db.get(serverID2);
                    await interaction.reply(`Server welcome subtitle is set to "${key}"`)
                } else {
                    const msg = interaction.options.getString('message');
                    let serverID = interaction.guild.id;
                    let serverID2 = "3" + serverID;
                    db.set(serverID2, msg).then(() => {});
                    // noinspection JSUnusedLocalSymbols
                    let key = await db.get(serverID2);
                    if (key === msg) {
                        await interaction.reply(`Server welcome subtitle set successfully to "${key}"`);
                    } else {
                        await interaction.reply('Whoopsie noodles, something went wrong baboom try againa latera')
												console.log("Database error bro")
                    }
                }
            }
        }
////////////////////////SET_IMG/////////////////////////
        else if (interaction.options.getSubcommand() === 'image') {
            if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                await interaction.reply('Oi fuck off, get perms')
            }
            if (interaction.member.permissions.has("ADMINISTRATOR")) {
                if(!interaction.options.getString('link')) {
								    let serverID = interaction.guild.id;
                    let serverID2 = "5" + serverID;
                    let key = await db.get(serverID2);
                    await interaction.reply(`Server welcome embed banner set to ${key}`)
                } else {
									//////////////////////////////////
                    let msg = interaction.options.getString('link');
										// noinspection JSUnresolvedFunction
                    if (validUrl.isUri(msg)) {
										if (msg.endsWith(".png") || msg.endsWith(".jpg")){
                    let serverID = interaction.guild.id;
                    let serverID2 = "5" + serverID;
                    db.set(serverID2, msg).then(() => {});
                    // noinspection JSUnusedLocalSymbols
                    let key = await db.get(serverID2);
                    if (key === msg) {
                    await interaction.reply(`Server welcome embed banner set successfully to ${key}`);
                    } else {
                        await interaction.reply('Whoopsie noodles, something went wrong baboom try againa latera');
												console.log("Database error bro " + key)
										}} else {await interaction.reply("GIVE ME A DAMN PNG OR A JPG. I NEED TO SNORT AN IMAGE FILE NOT AN HTML FILE")}}	
                    else {await interaction.reply('Need an actual URL, maybe? Like an https://something.com/image.png')}
						}}
        }
//////////////////////END OF CODE///////////////////////
    },
};
/*Explanation on how the database SUID work.
[serverID] = channel to send the message
2[serverID] = title of the card
3[serverID] = subtitle of the card
5[serverID] = banner image of the card
*/
