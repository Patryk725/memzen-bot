const { SlashCommandBuilder, OverwriteType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('paka')
    .setDescription('Wyświetla sformatowany tekst, który podasz')
    .addStringOption(option =>
      option.setName('tekst')
        .setDescription('Tekst do sformatowania')
        .setRequired(true)),
  async execute(interaction) {
    let tekst = interaction.options.getString('tekst');
    tekst = transformText(tekst)
    await interaction.reply({ content: tekst });
  },
};

function transformText(text) {

  let formatted_text = ''
  const special_symbols = ['*']

  if (text.includes('*')) {
    formatted_text = handleMultiple(text)
  }

  return `twój tekst: ${text}\nformatowany tekst:\n${formatted_text}`
}

// text multiplicator
function handleMultiple(text) {

  let [text_multiple, multiplicator] = text.split('*')

  multiplicator = parseInt(multiplicator)
  if (!multiplicator || multiplicator < 0) {
    return false;
  }

  text_multiple = text_multiple.replace(/{enter}/g, '\n');
  let formatted_text = ''
  for (let i = 0; i < multiplicator; i++) {
    formatted_text += text_multiple.replace(/\$/g, _ => i + 1);
  }

  return formatted_text
}
