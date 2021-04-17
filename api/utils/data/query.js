/**
 * 数据库常用查询方法模块
 */

let mysql = require('../core/connect')
let pool = require('../core/connPool')
const crypto = require("crypto");

// 返回值模板
let dat = {
  flag: 0,
  msg: '',
  data: {}
}

// 去掉字符串中单引号
function del_quotes(str) {
  return str.replace(/\'/g, "")
}

/**
 * 加密函数
 */
function MD5(initPWD) {
  var md5 = crypto.createHash('md5'); //创建哈希加密算法，后边可以是md5，sha1,sha256等
  var password = md5.update(initPWD).digest('base64');
  return password;
}

// 查询公有方法，回调方式
function query(sql, response) {
  mysql.query(sql, (err, data, fields) => {
    if (err) {
      dat.msg = err.toString()
      response.json(dat)
    }
    else {
      dat.flag = data.length == 0 ? 0 : 1
      dat.msg = data.length == 0 ? '数据为空' : '获取成功'
      dat.data = data
      response.json(dat)
    }
  })
}

// 查询共有方法，异步执行
function querySync(sql, values) {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          // 结束会话
          connection.release()
        })
      }
    })
  })

}

/**
 * user表查询部分
 */

// 查询user所有数据
function query_users(response) {
  query('SELECT * FROM user', response)
}

// 通过用户ID查询用户
function query_user_byId(id, response) {
  id = mysql.escape(id)
  query('SELECT * FROM user WHERE id=' + id, response)
}


/**
 * residents 表查询部分
 */

// 查询所有居民
function query_residents(response) {
  query('SELECT * FROM residents', response)
}

// 查询一个居民信息
function query_a_resident(info, response) {
  info = mysql.escape(info)
  let sql = `SELECT * FROM residents WHERE ID = ${info} OR NAME LIKE "%${del_quotes(info)}%" `
  query(sql, response)
}

// 根据楼栋查询居民信息
function query_building(building, response) {
  building = mysql.escape(building)
  let sql = `SELECT * FROM residents WHERE building = ${building}`
  query(sql, response)
}

// 查询居民进出数据
function query_resident_inoutdata(id, response) {
  id = mysql.escape(id)
  let sql = 'SELECT log.temperature,log.date,log.time,log.door,log.`in`,residents.`name`,`user`.`name` AS guard FROM log LEFT JOIN residents ON residents.id=resid LEFT JOIN `user` ON log.guardid=`user`.id WHERE resid = ' + id + ' ORDER BY log.id DESC'
  query(sql, response)
}

/**
 * 登陆部分
 */

// 登陆
function login(data, response) {
  let username = del_quotes(mysql.escape(data.username))
  let passwd = MD5(del_quotes(mysql.escape(data.passwd)))
  let sql = `SELECT * FROM user WHERE username = '${username}' AND passwd = '${passwd}'`
  query(sql, response)
}

/**
 * 仪表板
 */
async function dashboard() {
  let sql = `SELECT 
             log.id,log.in,resid,name,door,phone,building,room,unit,temperature,time 
             FROM log 
             LEFT JOIN residents ON log.resid=residents.id
             WHERE log.date=CURRENT_DATE
             ORDER BY log.id DESC;`
  let sqlStrange = "SELECT strangelog.id,strangelog.name,strangelog.phone,temperature,strangelog.time,residents.name as resname,`user`.`name` as guardname FROM strangelog LEFT JOIN residents ON residents.id=strangelog.resid LEFT JOIN `user` ON `user`.id=guard WHERE strangelog.date=CURRENT_DATE ORDER BY id DESC;"

  let rows = await querySync(sql, null);
  let strangeRows = await querySync(sqlStrange, null);

  let returnData = {
    rows: rows.slice(0, 10),
    in: 0,
    out: 0,
    warn: 0,
    strange: strangeRows.length,
    warnRows: [],
    strangeRows: strangeRows.slice(0, 10)
  }

  rows.forEach(item => {
    if(item.in == 1) {
      returnData.in ++
    } else {
      returnData.out ++
    }
    if(item.temperature > 37) {
      returnData.warn ++
      returnData.warnRows.push(item)
    }
  })

  return returnData
}

/**
 * 信息公告
 */
async function get_news() {
  let sql = 'SELECT * FROM news WHERE isdelete=0 ORDER BY time DESC;'
  let rows = await querySync(sql, null);
  return rows
}

module.exports = {
  query,
  query_users,
  query_user_byId,

  query_residents,
  query_a_resident,
  query_building,
  query_resident_inoutdata,

  login,

  dashboard,

  get_news
}