const { PermissionsBitField } = require('discord.js');

module.exports = {
  schedule: async (interaction) => {

    const botPermissions = interaction.appPermissions;

    const numbers = ["\u0031\u20E3", "\u0032\u20E3", "\u0033\u20E3", "\u0034\u20E3", "\u0035\u20E3", "\u0036\u20E3", "\u0037\u20E3", "\u0038\u20E3", "\u0039\u20E3"];

    const dateNow = new Date();

    const day = interaction.options.get('day')?.value ? interaction.options.get('day')?.value : dateNow.getDate();
    const month = interaction.options.get('month')?.value ? interaction.options.get('month')?.value : dateNow.getMonth() + 1;
    const year = interaction.options.get('year')?.value ? interaction.options.get('year')?.value : dateNow.getFullYear();
    const min = interaction.options.get('first')?.value;
    const max = interaction.options.get('last')?.value;


    if (min > max) {
      interaction.reply("Are you trying to stop before fun even started? Try again!");
      return;
    }

    console.log(`${year}-${month}-${day}`)
    const date = new Date(`${year}-${month}-${day}`);
    const weekday = date.getDay();

    console.log('min: ', min, ' max: ', max)


    // interaction.reply('Cmon give me time to dev');

    let index = 0;
    const reactions = [];

    let times = `**Times for ${date.toDateString()}** \n`;

    for(let h = min; h <= max; h++) {
      const unixStamp = date.setHours(h);
      const number = numbers[index];
      reactions.push(number);
      index++;
      console.log(`:${number}: <t:${unixStamp / 1000}:f> \n`)
      times = times.concat(`${number} <t:${unixStamp / 1000}:f> \n`);
    }
    times = times.concat(`:x: No can do`);
    reactions.push('\u274C');

    const reply = await interaction.reply({ content: times, fetchReply: true });
    
    if (botPermissions.has(PermissionsBitField.Flags.AddReactions)){
      for (const reaction of reactions) {
        console.log("reaction: ", reaction);
        await reply.react(reaction);
      }
    }
  }
}

// /schedule day: 24 month: 7 year: 2024 first: 18 last: 21