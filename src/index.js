require('dotenv').config();
const { Client, IntentsBitField, Integration, PermissionsBitField } = require('discord.js');
const data = require('./data.json');
const ratio = require('./commands/ratio');
const frags = require('./commands/frags');
const schedule = require('./commands/schedule');

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

bot.on('interactionCreate', async (interaction) => {

  console.log(interaction.appPermissions);
  
  if (!interaction.isChatInputCommand()) return;

  if(interaction.commandName ==='frags') {
    frags.frags(interaction);
  }
  else if (interaction.commandName ==='schedule') {
    await schedule.schedule(interaction);
  }
  else if (interaction.commandName ==='ratio') {
    ratio.ratio(interaction);
  }
})


bot.login(process.env.TOKEN);