const { SlashCommandBuilder } = require('discord.js');

let pingCount = 0;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        pingCount++;
        await interaction.reply('Pong! ' + pingCount + ' times!');
    },
};