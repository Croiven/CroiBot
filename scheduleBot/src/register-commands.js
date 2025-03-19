import dotenv from 'dotenv';
dotenv.config();
import { REST, Routes, ApplicationCommandOptionType } from 'discord.js';

const commands = [
  {
    name: 'schedules',
    description: 'Returns users schedule from Teamup',
    options: [{
      name: 'name',
      description: 'Give name',
      type: ApplicationCommandOptionType.String,
    }],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering commands..')
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('Commands registered');
  } catch (error) {
    console.log(error)
  }
})();