const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "A test command!",
    run: async (client, interaction, args) => {
        const send = await interaction.reply({
            content: "📌Pinding...",
            fetchReply: true,
        });
        const embed = new MessageEmbed()
            .setTitle("Pong")
            .setDescription(
                "> 🔌 Ping is " +
                    client.ws.ping +
                    " now!\n> 🔌 Run speed:" +
                    (send.createdAt - interaction.createdAt) +
                    "ms!"
            );
        const ch = send.channel;
        ch.send({ embeds: [embed] });
        send.delete();
    },
};
