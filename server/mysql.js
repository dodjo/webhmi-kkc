const cfg = require("./config/config")
const mysql = require("mysql")

  var mysql_k1 = mysql.createPool({
    host: cfg.MysqlDB.host,
    user: cfg.MysqlDB.user,
    password: cfg.MysqlDB.password,
    database: "protocol_konv1"
  });

  var mysql_k2 = mysql.createPool({
    host: cfg.MysqlDB.host,
    user: cfg.MysqlDB.user,
    password: cfg.MysqlDB.password,
    database: "protocol_konv2"
  });

  var mysql_k3 = mysql.createPool({
    host: cfg.MysqlDB.host,
    user: cfg.MysqlDB.user,
    password: cfg.MysqlDB.password,
    database: "protocol_konv3"
  });

module.exports = {
  mysql_k1,
  mysql_k2,
  mysql_k3
}
