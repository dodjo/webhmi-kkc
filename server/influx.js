const cfg = require("./config/config")
const Influx = require('influx');

console.log(cfg.InfluxDB)

const influx = new Influx.InfluxDB({
  host: cfg.Influx.host,
  database: cfg.Influx.database,
  port: cfg.Influx.port
});

const influxWrite = function (meas, value) {
                        influx.writePoints([{
                            measurement: meas,
                            // tags: { tag: tag},
                            fields: { value: value}
                        }])
                            .then(() => {
                                console.log(`Added data to the Db ${meas} - ${value}`);
                        });
                    }

module.exports = influxWrite
