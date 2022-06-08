///6MONTHS
exports.months6= function (newdata,itemname2) {
    var conf = { 
        "type": "line",
        "data": {
          "datasets": [
            {
              "label": itemname2,
              "fill": false,
              "data": newdata.map(a => { 
                return { x: a[0], y: a[1]  } 
              })
            }
          ]
        },
        "options": {
          "scales": {
            "xAxes": [{
              "scaleLabel": {
                "display": true,
                "labelString": '6-Month Range',
              },
              "type": "time",
              "time": {
                "parser": "MM-DD-YYYY",
                "unit": "month",
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
      }
    return conf ;
  }

///1DAY
exports.day1= function(newdata,itemname2) {
    var conf = { 
      "type": "line",
      "data": {
        "datasets": [
          {
            "label": itemname2,
            "fill": true,
            "data": newdata.map(a => { return { x: a[0], y: a[1]  } })
          }
        ]
      },
      "options": {
        "scales": {
          "xAxes": [{
            "scaleLabel": {
              "display": true,
              "labelString": 'Hours UTC 00:00',
            },
            "type": "time",
               "time": {
              "parser": "MM-DD-YYYY HH:mm",
              "unit": "hour",
              "displayFormats": {
                'hour': 'HH:mm',
                'second': 'HH:mm',
                'minute': 'HH:mm',
                'day': 'HH:mm',
                'month': 'HH:mm',
                'quarter': 'HH:mm',
                'year': 'HH:mm'
              }
            }
          }],
          "yAxes" : [
            {
              "scaleLabel": {
                "display": true,
                "labelString": 'Dulars',
                "fontColor": '#ff0000',
                "fontSize": 8,
                "fontStyle": 'bold',
              }
            }
          ]
        }
      }
    }
    return conf ;
  }

exports.day7= function(newdata,itemname2) {
    var conf = { 
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
              "scaleLabel": {
                "display": true,
                "labelString": '7-Day Range',
              },
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
    }
    return conf ;
  }


  exports.month1= function(newdata,itemname2) {
    var conf = { 
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
          "xAxes": [{ "scaleLabel": {
            "display": true,
            "labelString": '1-Month Range',
             },
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
    }
    return conf ;
  }