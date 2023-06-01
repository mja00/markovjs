const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    private: true,
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads a command.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to reload.')
                .setRequired(true)),
    async execute(interaction) {
        const commandName = interaction.options.getString('command', true).toLowerCase();
        const command = interaction.client.commands.get(commandName);
        const commandPath = interaction.client.commandsPath.get(commandName);

        if (!command) {
            return interaction.reply(`There is no command with name \`${commandName}\`.`);
        }

        delete require.cache[require.resolve(commandPath)];
        try {
            interaction.client.commands.delete(command.data.name);
            const newCommand = require(commandPath);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            return interaction.reply(`Command \`${command.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            return interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
        }

    },
};