/**
 * 数据库连接核心模块
 */

const c = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'entrance',
  charset: 'UTF8MB4_GENERAL_CI'
}

let mysql = require('mysql')
let connection = mysql.createConnection(c)

connection.connect()

module.exports = connection

