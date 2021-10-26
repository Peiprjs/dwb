// noinspection ES6MissingAwait
const { SlashCommandBuilder } = require('@discordjs/builders');
const { drawCard } = require('discord-welcome-card');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Test the welcome card!'),
    async execute(interaction) {
			    const image = await drawCard({
        theme: "circuit",
        text: {
            title: 'Hellloo',
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
		await interaction.reply({ files: [ image ] })

    },
};
/*This command is self-documenting*/