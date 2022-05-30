require('dotenv').config(); 
const Discord = require('discord.js'); 
const QuickChart = require('quickchart-js');

const client = new Discord.Client(
    {intents: ["GUILDS", "GUILD_MESSAGES" , "GUILD_WEBHOOKS" ,"GUILD_SCHEDULED_EVENTS"]}
    ); //create new client intent

const PREFIX = "$";

    //Initilize BOT
client.on('ready', () => {
    console.log("Youre now Online");
    console.log("Servers List:");
    client.guilds.cache.forEach((guild) => {
      console.log(" - " + guild.name);
    });
});
//CMD Here



client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
          .trim()
          .substring(PREFIX.length)
          .split(/\s+/);

          if (CMD_NAME === "chsb") {
        
                        // Create the chart
                        const chart = new QuickChart();
                        chart.setConfig({
                        type: 'line',
                        data: { labels: ['June', 'July', 'Aug', 'Sept'], datasets: [{ label: 'Tempest', data: [73402000, 69000000, 65000000,81000000] }] },
                        });
                        getUrl(chart).then(data =>{
                           console.log(data)
                           message.channel.send(`Sample data ${data}`);
                          }).catch(function (error) {
                            console.log('Error')
                            console.log(error)
                          });
                                                               
                        
                    }

                  }


});


async function getUrl(chart)
{
   const url = await chart.getShortUrl();
   return url;
}

//DISCORD TOKEN
client.login(process.env.CLIENT_TOKEN); 