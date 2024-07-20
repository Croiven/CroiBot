module.exports = {
  ratio: (interaction) => {
    const mainStat = interaction.options.get('main')?.value;
    const mainPercentage = interaction.options.get('main_percentage')?.value;
    const secondaryStat = interaction.options.get('secondary')?.value;
    const secondaryStat2 = interaction.options.get('secondary_2')?.value;

    console.log(mainStat);
    console.log(mainPercentage)
    console.log(secondaryStat)

    if (!secondaryStat2) {
      const percentageGain = 0.04 * mainStat + 0.01 * secondaryStat;
      const statGain = ((mainPercentage + 100) / 100 * 4);
      console.log(percentageGain);
      console.log(statGain);
      const ratio = (0.04 * mainStat + 0.01 * secondaryStat) / ((mainPercentage + 100) / 100 * 4);
      interaction.reply(`Your main stat/as% ratio is ${ratio}`);
    }
    else {
      const ratio = (0.04 * mainStat + 0.01 * (secondaryStat + secondaryStat2)) / ((mainPercentage + 100) / 100 * 4);
      interaction.reply(`Your main stat/as% ratio is  ${ratio}`);
    }
  }
}