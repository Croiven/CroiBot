require('dotenv').config();
const { Client, IntentsBitField, Integration } = require('discord.js');
const data = require('./data.json');

const bot = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
});

bot.on('ready', (c) => {
  console.log(`${c.user.tag} is online!`);
})

bot.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  let fields = [];
  let totalFragments = 0;
  let totalErdas = 0;

  const fieldMaker = (coreHandle, currentLevel, targetLevel) => {
    const name = data.cores[coreHandle].name;
    const type = data.cores[coreHandle].type;
  
    const neededFrags = data[type].fragments[targetLevel] - data[type].fragments[currentLevel];
    const neededErdas = data[type].erdas[targetLevel] - data[type].erdas[currentLevel];
    console.log('Frags: ', neededFrags, ' -- ', 'Sol erdas: ', neededErdas);
    totalFragments += neededFrags;
    totalErdas += neededErdas;
    fields.push( 
      {
        name: `${name} needed materials`,
        value: `Current level: ${currentLevel} \n Target level: ${targetLevel} \n Fragments: ${neededFrags} \n Sol erdas: ${neededErdas}`,
        inline: true
      },
    )
  }


  if(interaction.commandName ==='frags') {

    Object.keys(data.cores).forEach(key => {
      const value = interaction.options.get(key)?.value;
      console.log(value)
      const currentLevel = parseInt(value?.split(':')[0]);
      console.log('currentLevel: ', currentLevel);
      let targetLevel = parseInt(value?.split(':')[1]);
      console.log('targetLevel: ', targetLevel);
      if (!targetLevel) targetLevel = 30;
      //const level = interaction.options.get(key)?.value;
      if (key && (currentLevel >= 0 || currentLevel <= 30 ) && (targetLevel >= 0 || targetLevel <= 30 )) {
        console.log(key, currentLevel, targetLevel)
        fieldMaker(key, currentLevel, targetLevel);
      }
    })
    
    fields.push( 
      {
        name: 'Total needed materials',
        value: `Fragments: ${totalFragments} \n Sol erdas: ${totalErdas}`
      },
    )

    const embed = {
      title: "Maplestory 6th job calculator",
      fields: fields
    }

    console.log(embed)

    interaction.reply({embeds: [embed]})
  }
})


bot.login(process.env.TOKEN);