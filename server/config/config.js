const Influx = {
  host: '10.191.23.191',
  database: 'kkc',
  port: 8086
}

const MysqlDB = {
    host: "10.191.23.181",
    user: "root",
    password: "root",
}

const SocketIO = {
    connection: 'http://10.191.23.182'
}


module.exports = { Influx, MysqlDB, SocketIO }
