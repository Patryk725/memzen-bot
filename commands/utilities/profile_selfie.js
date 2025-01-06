const { SlashCommandBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('selfie')
    .setDescription('Wyślij zdjęcie ze swoim awatarem'),
  async execute(interaction) {
    try {
      // not the best way to get user avatar, but webp (via discord API) format is not supported
      let userAvatarURL = "https://cdn.discordapp.com/avatars/" + interaction.user.id + "/" + interaction.user.avatar + ".png";

      const baseImage = await loadImage('commands/utility/base.jpg');
      const avatarImage = await loadImage(userAvatarURL);

      const canvas = createCanvas(baseImage.width, baseImage.height);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(baseImage, 0, 0);

      const avatarSize = 450;
      const x = canvas.width - avatarSize - 100;
      const y = 10;
      ctx.beginPath();
      ctx.arc(x + avatarSize / 2, y + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatarImage, x, y, avatarSize, avatarSize);

      const attachment = canvas.toBuffer();
      await interaction.reply({ files: [{ attachment, name: 'selfie.png' }] });
    } catch (error) {
      console.error('Błąd:', error);
      await interaction.reply('Wystąpił błąd podczas generowania obrazu.');
    }
  },
};
