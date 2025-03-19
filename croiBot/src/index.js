import { Client, IntentsBitField } from 'discord.js';
import { ratio as _ratio } from './commands/ratio.js';
import { frags as _frags } from './commands/frags.js';
import { schedule as _schedule } from './commands/schedule.js';
import dotenv from 'dotenv';
dotenv.config();

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