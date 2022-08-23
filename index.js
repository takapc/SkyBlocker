const Discord = require("discord.js");
const { Intents, Client } = require("discord.js");
const client = new Client({ intents: 32767 });

const fs = require("fs");
require("dotenv").config();

const prefix = process.env.PREFIX;
const token = process.env.DISCORD_TOKEN;

client.commands = new Discord.Collection();

fs.readdirSync("./commands/").forEach((dir) => {
    const commands = fs
        .readdirSync(`./commands/${dir}/`)
        .filter((file) => file.endsWith(".js"));
    for (let file of commands) {
        let pull = require(`./commands/${dir}/${file}`);
        client.commands.set(pull.name, pull);
    }
});

console.log(client.commands);

client.on("ready", () => {
    console.info(client.user.tag + " is enabled ✅");
    let data = [];
    client.commands.forEach((file) => {
        data.push({
            name: file.name,
            description: file.description,
        });
    });
    client.application.commands.set(data);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    client.commands.forEach((command) => {
        if (interaction.commandName === command.name) {
            command.run(client, interaction);
        }
    });
});

client.login(token);
