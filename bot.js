require('dotenv').config(); 
const Discord = require('discord.js'); 
const QuickChart = require('quickchart-js');
const axios = require("axios");


const schedule = require('node-schedule');
var mysql = require('mysql');

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

//CMDs Here
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
          .trim()
          .substring(PREFIX.length)
          .split(/\s+/);

          if (CMD_NAME === "chart6") {
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
                        myChart.setConfig({ 
                          "type": "line",
                          "data": {
                            "datasets": [
                              {
                                "label": itemname2,
                                "fill": false,
                                "data": newdata.map(a => { return { x: a[0], y: a[1]  } })
                              }
                            ]
                          },
                          "options": {
                            "scales": {
                              "xAxes": [{
                                "type": "time",
                                "time": {
                                  "parser": "MM-DD-YYYY",
                                  "unit": "month",
                                  "displayFormats": {
                                    "day": "MMM"
                                  }
                                }
                              }]
                            }
                          }
                        });
                        ///SEND CHART
                        getUrl(myChart).then(data =>{
                          console.log(data)
                             message.channel.send(`Sample data ${data}`);
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
      }else if(CMD_NAME === "chart1d") {
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
                    myChart.setConfig({ 
                      "type": "line",
                      "data": {
                        "datasets": [
                          {
                            "label": itemname2,
                            "fill": false,
                            "data": newdata.map(a => { return { x: a[0], y: a[1]  } })
                          }
                        ]
                      },
                      "options": {
                        "scales": {
                          "xAxes": [{
                            "type": "time",
                            "time": {
                              "parser": "MM-DD-YYYY HH:mm",
                              "unit": "hour",
                              "displayFormats": {
                                'hour': 'HH:mm:ss',
                                'second': 'HH:mm:ss',
                                'minute': 'HH:mm:ss',
                                'day': 'HH:mm:ss',
                                'month': 'HH:mm:ss',
                                'quarter': 'HH:mm:ss',
                                'year': 'HH:mm:ss'
                              }
                            }
                          }]
                        }
                      }
                    });
                    ///SEND CHART
                    getUrl(myChart).then(data =>{
                      console.log(data)
                         message.channel.send(`Sample data ${data}`);
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





      }else if(CMD_NAME === "chart7d"){
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
                  //START CHART
                  const myChart = new QuickChart();
                    myChart.setConfig({ 
                      "type": "line",
                      "data": {
                        "datasets": [
                          {
                            "label": itemname2,
                            "fill": false,
                            "data": newdata.map(a => { return { x: a[0], y: a[1]  } })
                          }
                        ]
                      },
                      "options": {
                        "scales": {
                          "xAxes": [{
                            "type": "time",
                            "time": {
                              "parser": "MM-DD-YYYY",
                              "unit": "day",
                              "displayFormats": {
                                'millisecond': 'MMM DD',
                                'second': 'MMM DD',
                                'minute': 'MMM DD',
                                'hour': 'MMM DD',
                                'day': 'MMM DD',
                                'week': 'MMM DD',
                                'month': 'MMM DD',
                                'quarter': 'MMM DD',
                                'year': 'MMM DD'
                              }
                            }
                          }]
                        }
                      }
                    });
                    ///SEND CHART
                    getUrl(myChart).then(data =>{
                      console.log(data)
                         message.channel.send(`Sample data ${data}`);
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

      }
    }       
});

//GET CHART URL
async function getUrl(chart)
{
   const url = await chart.getShortUrl();
   return url;
}

//DISCORD TOKEN
client.login(process.env.CLIENT_TOKEN); 


const job = schedule.scheduleJob('*/2 * * * *', function(){
  var data1 = {
    tradezone: "13",
    category: "0",
    search: "Tempest",
  };
  var sentdata = Object.keys(data1)
        .map((key) => key + "=" + data1[key])
        .join("&");
      var url = "http://meaty.dfprofiler.com/browsemarketplace.php?function=browseMarketWithCredits";
      axios({
        method: "post",
        url: url,
        data: sentdata,
      })
        .then(function (response) {
          const consql = mysql.createConnection({
            host: process.env.HOST_DB,  
            user: process.env.USER_DB,
            password: process.env.PASS_DB,
            database: process.env.DB_DB
          });

          var result = response.data;
          var resname1 = result[1].name;
          var resprice1 = result[1].price;
          // var resseller1 = result[1].sellerName;
          console.log(resname1);
          console.log(resprice1);
          // console.log(resseller1);
          console.log('Insert Succesfully');

                 consql.connect(function(err) {
                   if (err) throw err;
                     consql.query("INSERT INTO pricehistory3( itemname, itemprice) VALUES ( '"+resname1+"' , "+resprice1+");", function (err, result, fields) {
                      if (err) throw err;
                        console.log(result.affectedRows);
                    });
                 });
             }).catch(function (error) {
                 console.log('Insert Not Succesfull');
                 });

});


const job2 = schedule.scheduleJob('*/2 * * * *', function(){
  var data1 = {
    tradezone: "13",
    category: "0",
    search: "100 Credits",
  };
  var sentdata = Object.keys(data1)
        .map((key) => key + "=" + data1[key])
        .join("&");
      var url = "http://meaty.dfprofiler.com/browsemarketplace.php?function=browseMarketWithCredits";
      axios({
        method: "post",
        url: url,
        data: sentdata,
      })
        .then(function (response) {
          const consql = mysql.createConnection({
            host: process.env.HOST_DB,  
            user: process.env.USER_DB,
            password: process.env.PASS_DB,
            database: process.env.DB_DB
          });

          var result = response.data;
          var resname1 = result[1].name;
          var resprice1 = result[1].price;
          // var resseller1 = result[1].sellerName;
          console.log(resname1);
          console.log(resprice1);
          // console.log(resseller1);
          console.log('Insert Succesfully');

                 consql.connect(function(err) {
                   if (err) throw err;
                     consql.query("INSERT INTO pricehistory3( itemname, itemprice) VALUES ( '"+resname1+"' , "+resprice1+");", function (err, result, fields) {
                      if (err) throw err;
                        console.log(result.affectedRows);
                    });
                 });
             }).catch(function (error) {
                 console.log('Insert Not Succesfull');
                 });

});



