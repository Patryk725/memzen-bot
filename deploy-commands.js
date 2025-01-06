const { REST, Routes } = require('discord.js');
const token = process.env['token'];
const clientId = process.env['app_id'];
const guildId = process.env['server_id'];
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands/utilies').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/utilies/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Rejestracja komend aplikacji...');
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    console.log('Komendy zostały zarejestrowane!');
  } catch (error) {
    console.error(error);
  }
})();
