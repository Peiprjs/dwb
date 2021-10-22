const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Allows you to change the server\'s configuration')
        .addSubcommand(subcommand =>
            subcommand
                .setName('channel')
                .setDescription('Allows you to set up the channel')
                .addStringOption(option =>
                    option.setName('channel')
                        .setDescription('The channel you want to use as a welcoming channel')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
             subcommand
                .setName('channel')
                .setDescription('Allows you to set up the channel')
                .addStringOption(option =>
                    option.setName('channel')
                        .setDescription('The channel you want to use as a welcoming channel')
                        .setRequired(true))),
    async execute(interaction) {
        await interaction.reply({ content: `In progress lmao`, ephemeral: true });
    },
};
