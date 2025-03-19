require('dotenv').config();
import { Client, IntentsBitField, Integration, PermissionsBitField } from 'discord.js';
import data from './data.json';
import { ratio as _ratio } from './commands/ratio';
import { frags as _frags } from './commands/frags';
import { schedule as _schedule } from './commands/schedule';

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
    _frags(interaction);
  }
  else if (interaction.commandName ==='schedule') {
    await _schedule(interaction);
  }
  else if (interaction.commandName ==='ratio') {
    _ratio(interaction);
  }
})


bot.login(process.env.TOKEN);