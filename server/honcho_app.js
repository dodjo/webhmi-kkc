const honcho = require('honcho')
const influxWrite = require('./influx.js')
const SubscriptionTags = require('./SubscriptionTags.js')
const controllers = require('./СontrollersSettings.js')
const {io} = require('./app')
const fs = require('fs')


// console.log(SubscriptionTags.length)

hconfig = {
  tagFileDir: './tags',
  controllers
}

let count_controllers = 0
let objectTag = {}

module.exports = function() { honcho.configure(hconfig, function () {

  io.on("connection", socket => {

    socket.on('write_data', (data, cb)=>{
        honcho.write(data.tag, data.value)
        console.log(`Данные записаны (${data.tag} : ${data.value})`)
        return cb(`Данные записаны (${data.tag} : ${data.value})`)
      })
  });

  honcho.createSubscription(
    SubscriptionTags,
    (err, vars) => {

        // console.log(vars)
        for (const key in vars) {
          // console.log(key + " - " + vars[key].toFixed(1))
          if (vars[key]=='BAD 255') {
            vars[key] = -1000
            let dt = new Date()
            fs.appendFile('log_error.txt', dt + " Error: no data " + key + "\n", function (err) {
              if (err) return console.log("File error: " + err);
            });
          }
          influxWrite(key, Number(vars[key]))

          objectTag[key] = Number(vars[key])
          // io.emit("SendData", key, Number(vars[key]))
          // output_tags.push(objectTag)
        }

        // output_tags[count_controllers] = vars
        // console.log(count_controllers)

        if (count_controllers >= controllers.length) {
          // console.log(objectTag)
          io.emit("SendData", objectTag)
          count_controllers = 0
          output_tags=[]
        }
        count_controllers++
    }, 1000);
})
}