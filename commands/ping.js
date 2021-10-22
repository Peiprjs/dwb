// noinspection ES6MissingAwait

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true, ephemeral: true});
        interaction.editReply({ content: `Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`, ephemeral: true })


    },
};
