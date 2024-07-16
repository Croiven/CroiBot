require('dotenv').config();
const { REST, Routes, Application, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'frags',
    description: 'Calculate needed fragments and Sol Erdas',
    options: [
      {
        name: 'mastery_1',
        description: 'Mastery core current level. Syntax: [currentLevel:targetLevel]',
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'mastery_2',
        description: 'Mastery core level. Syntax: [currentLevel:targetLevel]',
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'skill_1',
        description: 'Skill core level. Syntax: [currentLevel:targetLevel]',
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'boost_1',
        description: 'Boost core level. Syntax: [currentLevel:targetLevel]',
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'boost_2',
        description: 'Boost core level. Syntax: [currentLevel:targetLevel]',
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'boost_3',
        description: 'Boost core level. Syntax: [currentLevel:targetLevel]',
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'boost_4',
        description: 'Boost core level. Syntax: [currentLevel:targetLevel]',
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'common_1',
        description: 'Common core level. Syntax: [currentLevel:targetLevel]',
        type: ApplicationCommandOptionType.String,
      }
    ]
  }
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering commands..')
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('Commands registered');
  } catch (error) {
    console.log(error)
  }
})();