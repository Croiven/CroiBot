
import { Client, IntentsBitField, Integration, PermissionsBitField } from 'discord.js';
import dotenv from 'dotenv';
import  { schedule } from './commands/schedule.js';
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

  if(interaction.commandName ==='schedules') {
    schedule(interaction);
  }
})

bot.login(process.env.TOKEN);