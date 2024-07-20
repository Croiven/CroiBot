require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
const data = require('./data.json');

const options = [];

Object.keys(data.cores).forEach(key => {

  const description = data.cores[key].description;

  options.push({
    name: key,
    description: description,
    type: ApplicationCommandOptionType.String,
  })
});

console.log(options)

const commands = [
  {
    name: 'frags',
    description: 'Calculate needed fragments and Sol Erdas',
    options: options
  },
  {
    name: 'schedule',
    description: 'Generates unixtimestamps for wanted range',
    options: [
      {
        name: 'day',
        description: 'Wanted day, default today',
        type: ApplicationCommandOptionType.Number
      },
      {
        name: 'month',
        description: 'Wanted month, default this month',
        type: ApplicationCommandOptionType.Number
      },
      {
        name: 'year',
        description: 'Wanted year, default this year',
        type: ApplicationCommandOptionType.Number
      },
      {
        name: 'first',
        description: 'First time',
        type: ApplicationCommandOptionType.Number
      },
      {
        name: 'last',
        description: 'Last time',
        type: ApplicationCommandOptionType.Number
      },
    ]
  },
  {
    name: 'ratio',
    description: 'Calculates stat/as% ratio',
    options: [
      {
        name: 'main',
        description: 'Base main stat',
        type: ApplicationCommandOptionType.Number,
        required: true
      },
      {
        name: 'main_percentage',
        description: 'Base secondary stat',
        type: ApplicationCommandOptionType.Number,
        required: true
      },
      {
        name: 'secondary',
        description: 'Main stat %',
        type: ApplicationCommandOptionType.Number,
        required: true
      },
      {
        name: 'secondary_2',
        description: 'Secondary stat %',
        type: ApplicationCommandOptionType.Number,
      },
    ]
  }
]

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