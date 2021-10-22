const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Replies with the bot invitation!'),
    async execute(interaction) {
        await interaction.reply({ content: `**Invite me at**: https://discord.com/oauth2/authorize?client_id=900664144418734080&permissions=3149064&scope=applications.commands%20bot`, ephemeral: true });
    },
};
