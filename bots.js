require('dotenv').config(); 
const Discord = require('discord.js'); 
const QuickChart = require('quickchart-js');
const axios = require("axios");

const chartconf = require('./modulesconf');


const schedule = require('node-schedule');
var mysql = require('mysql');

const client = new Discord.Client(
    {intents: ["GUILDS", "GUILD_MESSAGES" , "GUILD_WEBHOOKS" ,"GUILD_SCHEDULED_EVENTS"]}
    ); //create new client intent

const PREFIX = "%";


    //Initilize BOT
client.on('ready', () => {
    console.log("Youre now Online");
    console.log("Servers List:");
    client.guilds.cache.forEach((guild) => {
      console.log(" - " + guild.name);
    });
});

//CMDs Here
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
          .trim()
          .substring(PREFIX.length)
          .split(/\s+/);
            //6 MONTHS
            if (CMD_NAME === "chart-6m"){
            var itemname = args.join(" ");
            let itemname2 = itemname.toString();
            console.log(itemname2);
            ///DB CNNCTION OPEN
            const consql = mysql.createConnection({
              host: process.env.HOST_DB,  
              user: process.env.USER_DB,
              password: process.env.PASS_DB,
              database: process.env.DB_DB
            });

            consql.connect(function(err) {
              if (err) throw err;
              consql.query("SELECT *, DATE_FORMAT(datetimestamp,'%m-%d-%Y') AS newDate FROM pricehistory3 WHERE itemname= '"+itemname2+"' AND datetimestamp >= (NOW() - INTERVAL 6 MONTH) ORDER BY newDate ASC;", function (err, result, fields) {
                if (err) throw err;
                if(result.length > 0){
                  var newdata = [];
                  result.forEach(row => {
                    newdata.push([row.newDate,row.itemprice]);
                    });
                      //START CHART
                      const myChart = new QuickChart();
                        myChart.setConfig(chartconf.months6(newdata,itemname2));
                        ///SEND CHART
                        getUrl(myChart).then(data =>{
                          console.log(data)
                             message.channel.send(`Here's what we got ${data}`);
                             }).catch(function (error) {
                           console.log('Error')
                           console.log(error)
                         });        
                }else{
                  message.channel.send(`The item that your trying to search is not on my Database`);
                }

             });
         });
         //1 DAY RANGE
      }else if(CMD_NAME === "chart-1d"){
        var itemname = args.join(" ");
        let itemname2 = itemname.toString();
        console.log(itemname2);
        ///DB CNNCTION OPEN
        const consql = mysql.createConnection({
          host: process.env.HOST_DB,  
          user: process.env.USER_DB,
          password: process.env.PASS_DB,
          database: process.env.DB_DB
        });

        consql.connect(function(err) {
          if (err) throw err;
          consql.query("SELECT *, DATE_FORMAT(datetimestamp,'%m-%d-%Y %H:%i') AS newDate FROM pricehistory3 WHERE itemname= '"+itemname2+"' AND datetimestamp >= (NOW() - INTERVAL 1 DAY) ORDER BY newDate ASC;", function (err, result, fields) {
            if (err) throw err;
            if(result.length > 0){
              var newdata = [];
              result.forEach(row => {
                newdata.push([row.newDate,row.itemprice]);
                });
                  //START CHART
                  const myChart = new QuickChart();
                    myChart.setConfig(chartconf.day1(newdata,itemname2));
                    ///SEND CHART
                    getUrl(myChart).then(data =>{
                      console.log(data)
                         message.channel.send(`Here's what we got ${data}`);
                         }).catch(function (error) {
                       console.log('Error')
                       console.log(error)
                     });        
            }else{
              message.channel.send(`The item that your trying to search is not on my Database`);
            }

         });
     });





      }else if(CMD_NAME === "chart-7d"){
        var itemname = args.join(" ");
        let itemname2 = itemname.toString();
        console.log(itemname2);
        ///DB CNNCTION OPEN
        const consql = mysql.createConnection({
          host: process.env.HOST_DB,  
          user: process.env.USER_DB,
          password: process.env.PASS_DB,
          database: process.env.DB_DB
        });

        consql.connect(function(err) {
          if (err) throw err;
          consql.query("SELECT *, DATE_FORMAT(datetimestamp,'%m-%d-%Y') AS newDate FROM pricehistory3 WHERE itemname= '"+itemname2+"' AND datetimestamp >= (NOW() - INTERVAL 7 DAY) ORDER BY newDate ASC;", function (err, result, fields) {
            if (err) throw err;
            if(result.length > 0){
              var newdata = [];
              result.forEach(row => {
                newdata.push([row.newDate,row.itemprice]);
                });
                  //START CHARTnbnbn
                  const myChart = new QuickChart();
                    myChart.setConfig(chartconf.day7(newdata,itemname2));
                    ///SEND CHART
                    getUrl(myChart).then(data =>{
                         message.channel.send(`Here's what we got ${data}`);
                         }).catch(function (error) {
                       console.log('Error')
                     });        
            }else{
              message.channel.send(`ThWFe item that your trying to search is not on my Database`);
            }
            console.log(result);
         });
     });

      }else if(CMD_NAME === "chart-1m"){
        var itemname = args.join(" ");
        let itemname2 = itemname.toString();
        console.log(itemname2);
        ///DB CNNCTION OPEN
        const consql = mysql.createConnection({
          host: process.env.HOST_DB,  
          user: process.env.USER_DB,
          password: process.env.PASS_DB,
          database: process.env.DB_DB
        });

        consql.connect(function(err) {
          if (err) throw err;
          consql.query("SELECT *, DATE_FORMAT(datetimestamp,'%m-%d-%Y') AS newDate FROM pricehistory3 WHERE itemname= '"+itemname2+"' AND datetimestamp >= (NOW() - INTERVAL 1 MONTH) ORDER BY newDate ASC;", function (err, result, fields) {
            if (err) throw err;
            if(result.length > 0){
              var newdata = [];
              result.forEach(row => {
                newdata.push([row.newDate,row.itemprice]);
                });
                  //START CHART
                  const myChart = new QuickChart();
                    myChart.setConfig(chartconf.month1(newdata,itemname2));
                    ///SEND CHART
                    getUrl(myChart).then(data =>{
                      console.log(data)
                         message.channel.send(`Here's what we got ${data}`);
                         }).catch(function (error) {
                       console.log('Error')
                       console.log(error)
                     });        
                     console.log(newdata);
            }else{
              message.channel.send(`The item that your trying to search is not on my Database`);
            }
            console.log(result);

         });
     });
      }else if(CMD_NAME === "add-watchlist"){
        var itemname = args.join(" ");
        let itemstring = itemname.toString();

        const consql = mysql.createConnection({
          host: process.env.HOST_DB,  
          user: process.env.USER_DB,
          password: process.env.PASS_DB,
          database: process.env.DB_DB
        });

        consql.connect(function(err) {
          if (err) throw err;
          consql.query("INSERT INTO watchlist (items) VALUES ('"+itemstring+"');", function (err, result, fields) {
            if (err) throw err;
            console.log(result.affectedRows);
            console.log(itemstring+' has been added to my watchlist');
            message.channel.send(`${itemstring} has been added to my watchlist`);
          });  
        });
      }else if(CMD_NAME === "show-watchlist"){
        var itemname = args.join(" ");
        let itemstring = itemname.toString();

        const consql = mysql.createConnection({
          host: process.env.HOST_DB,  
          user: process.env.USER_DB,
          password: process.env.PASS_DB,
          database: process.env.DB_DB
        });

        consql.connect(function(err) {
          if (err) throw err;
          consql.query("SELECT * FROM watchlist;", function (err, result, fields) {
            if (err) throw err;
            if(result.length > 0){
              var watchlist = [];
              // result.forEach(row => {
              //   watchlist.push([row.items]);
              //   });
                const exampleEmbed = new Discord.MessageEmbed();
                exampleEmbed.setColor("#3c00ff");
                exampleEmbed.setTitle("🔥In Watchlist🔥");
                for (var i = 0; i < result.length; i++) {
                  exampleEmbed.addFields({
                    name: "-------------",
                    value: result[i]["items"],
                  });
                }
                message.channel.send({ embeds: [exampleEmbed] });
            }
          });  
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


const watchjob = schedule.scheduleJob('*/59 * * * *', function(){

  const consql = mysql.createConnection({
    host: process.env.HOST_DB,  
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.DB_DB
  });

  consql.connect(function(err) {
    if (err) throw err;
    consql.query("SELECT items FROM watchlist;", function (err, result, fields) { 
      if(result.length > 0){
        result.forEach(row => {
          const items = row.items;
          var data1 = {
            tradezone: "13",
            category: "0",
            search: items,
          };
          var sentdata = Object.keys(data1).map((key) => key + "=" + data1[key]).join("&");
              var url = "http://meaty.dfprofiler.com/browsemarketplace.php?function=browseMarketWithCredits";
              axios({
                method: "post",
                url: url,
                data: sentdata,
              })
                .then(function (response) {
                  var result = response.data;
                  var resname1 = result[1].name;
                  var resprice1 = result[1].price;
                           const consql = mysql.createConnection({
                           host: process.env.HOST_DB,  
                           user: process.env.USER_DB,
                           password: process.env.PASS_DB,
                           database: process.env.DB_DB
                           });
                           consql.connect(function(err) {
                           if (err) throw err;
                             consql.query("INSERT INTO pricehistory3( itemname, itemprice) VALUES ( '"+resname1+"' , "+resprice1+");", function (err, result, fields) {
                              if (err) throw err;
                                console.log(result.affectedRows);
                                console.log(resname1+' Insert Succesfully');
                            });
                         });
                     }).catch(function (error) {
                      console.log(resname1+' Insert Not Succesfull');
              });
           });
         }
     });
  });
});