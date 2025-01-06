const fs = require('fs');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
// token from replit for bot (can't show my key)
const token = process.env['token'];

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages],
  partials: ['CHANNEL']
});
client.commands = new Collection();

// Wczytywanie komend
const commandFiles = fs.readdirSync('./commands/utilities').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/utilities/${file}`);
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Obsługa interakcji
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Wystąpił błąd podczas wykonywania komendy!', ephemeral: true });
  }
});

client.login(token);
