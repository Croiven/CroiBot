import dotenv from 'dotenv';
import { EmbedBuilder } from 'discord.js';
dotenv.config();

const formatDate = (date) => date.toISOString().split('T')[0];

export const schedule = async (interaction) => {
  let name = interaction.options.getString('name');
  console.log(name);
  console.log(process.env.TEAMUP_API_URL);

  const today = new Date();
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(today.getDate() + 14); // Add 14 days

  const startDate = formatDate(today);
  const endDate = formatDate(twoWeeksLater);

  let eventsResponse;
  try {
    eventsResponse = await fetch(`${process.env.TEAMUP_API_URL}events?startDate=${startDate}&endDate=${endDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Teamup-token': process.env.TEAMUP_API_KEY
      },
    });

    console.log(eventsResponse);
    const body = await eventsResponse.json();
    let events = body.events;
    console.log(body.events);
  
    if (name?.length > 2) {
      events = events.filter(event => event.who.toLowerCase().includes(name.toLowerCase()));
    }
  
    if (events.length === 0) {
      await interaction.reply(`No events found for ${name}. Check typos or you might need to find new friends 🤷‍♂️`);
      return;
    }
    
    let eventText = events.map((event, index) => 
      `**${index + 1}. ${event.title}**  
       🕒 **Start:** <t:${Math.floor(new Date(event.start_dt).getTime() / 1000)}:F>  
       ⏳ **End:** <t:${Math.floor(new Date(event.end_dt).getTime() / 1000)}:F>  
       👥 **Participants:** ${event.who || 'Not specified'}\n`
    ).join("\n");
  
    const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`📅 Upcoming Events for ${name}`)
        .setDescription(eventText)
        .setFooter({ text: `Total Events: ${events.length}` });
  
    await interaction.reply({ embeds: [embed]});
  } catch (error) {
    console.error('Error fetching events:', error);
    await interaction.reply('There was an error fetching the events. Please try again later.');
    return;
  }

}