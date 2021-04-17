/**
 * 数据库常用插入数据模块
 */

let mysql = require('../core/connect')
const crypto = require("crypto");

// let t = mysql.escape

/*********** 全局变量及方法 ***********/

// 返回值模板
let dat = {
  flag: 0,
  msg: '',
  data: {}
}

// 数组数据添加引号,修改数组原型链方法
Array.prototype.toStrings = function () {
  let str = ''
  this.forEach(item => {
    str += "`" + item + "`,"
  })
  return str.slice(0, str.length - 1)
}

// 去掉字符串中单引号
function del_quotes(str) {
  return str.replace(/\'/g, "")
}

// 居民表字段
let residents_field = ['name', 'sex', 'phone', 'building', 'unit', 'room']

// 管理用户表字段
let user_field = ['username', 'passwd', 'name']

// 居民进出记录表字段
let log_field = ['resid', 'in', 'door', 'temperature', 'date', 'time', 'guardid']

// 外来人员进出记录字段
let strangelog_field = ['name' ,'phone', 'resid', 'temperature', 'date', 'time', 'guard']

/**
 * 加密函数
 */
function MD5(initPWD) {
	var md5 = crypto.createHash('md5'); //创建哈希加密算法，后边可以是md5，sha1,sha256等
	var password = md5.update(initPWD).digest('base64');
	return password;
}

/**
 * 判断数据是否重复
 */
function checkOnlyDataAndInsert(sqlData, dataObj, response) {
  let sql = `SELECT id from ${sqlData.table} WHERE ${sqlData.field} = "${sqlData.val}"`
  console.log('function isOnly:', sql)
  // 查询是否存在当前条目
  mysql.query(sql, (err, data, fields) => {
    if(err) {
      dat.msg = err.toString()
      response.json(dat)
    }
    else {
      if(data.length == 0) {
        // 不存在当前条目，插入新值
        insert(dataObj, response)
      }
      else {
        // 存在
        hasRepeatData(response)
      }
    }
  })
}

/**
 * 存在重复数据
 */
function hasRepeatData(response) {
  dat.flag = 0
  dat.data = {}
  dat.msg = '已有重复数据！'
  response.json(dat)
}

/**
 * 当前时间 字符串
 */
function nowTime() {
  let timeObj = new Date()
  let date = timeObj.getFullYear() + '-' + (timeObj.getMonth()+1) + '-' + timeObj.getDate()
  let time = timeObj.getHours() + ':' + timeObj.getMinutes() + ':' + timeObj.getSeconds()

  return {
    date: date,
    time: time
  }
}

// 插入数据公有方法
/**
 * dataObj = {
 *  table: '数据库', (String)
 *  fields: '列', (Array)
 *  data: '数据', (Array)
 * }
 */
function insert(dataObj, response) {

  let table = dataObj.table
  let fie = dataObj.fields
  let data = dataObj.data
  if (fie.length != data.length) {
    dat.msg = '插入字段与数据长度不符！'
    response.json(dat.msg)
    return
  }
  // 填充问号，给插值用
  let v = new Array(data.length).fill('?')

  // sql语句
  let sql = del_quotes(
    mysql.escape(
      `INSERT INTO ${table} (${del_quotes(fie.toStrings())}) VALUES (${del_quotes(v.toString())})`
    )
  )

  // 插入的值
  let sqlparams = data

  mysql.query(sql, sqlparams, (err, data, fields) => {
    if (err) {
      dat.msg = err.toString()
      response.json(dat)
    }
    else {
      dat.flag = 1
      dat.msg = data.length == 0 ? '空' : '插入成功'
      dat.data = data
      response.json(dat)
    }
  })
}


/********* 具体操作方法部分 ***********/
/**
 * residents表数据新增
 */

// 新增居民数据
function insert_residents(data, response) {
  let dataObj = {
    table: 'residents',
    fields: residents_field,
    data: [data.name, data.sex, data.phone, data.building, data.unit, data.room]
  }
  // 重复数据检测并插值
  checkOnlyDataAndInsert({
    table: 'residents', 
    field: 'name',
    val: data.name
  }, dataObj, response)
}


/**
 * users表数据新增
 */

// 新增管理用户
function insert_user(data, response) {
  let dataObj = {
    table: 'user',
    fields: user_field,
    data: [data.username, MD5(data.passwd), data.name]
  }
  // 重复数据检测并插值
  checkOnlyDataAndInsert({
    table: 'user', 
    field: 'username',
    val: data.username
  }, dataObj, response)
}

/**
 * log表新增
 */
// 新增居民进出记录
function insert_log(data, response) {
  let d = nowTime()

  let dataObj = {
    table: 'log',
    fields: log_field,
    data: [data.id, data.in, data.door, data.temperature, d.date, d.time, data.guardId]
  }
  insert(dataObj, response)
}

// 新增外来人员进出记录
function insert_strangelog(data, response) {
  let d = nowTime()

  let dataObj = {
    table: 'strangelog',
    fields: strangelog_field, //['name' ,'phone', 'resid', 'temperature', 'date', 'time', 'guard']
    data: [data.name, data.phone, data.resId, data.temperature, d.date, d.time, data.guardId]
  }
  insert(dataObj, response)
}

// 新增信息
function new_news(data, response) {
  let sql = `INSERT INTO news (title, content, author, time) VALUES ('${data.title}', '${data.content}', '${data.author}', CURRENT_TIMESTAMP)`

  mysql.query(sql, '', (err, data, fields) => {
    if (err) {
      dat.msg = err.toString()
      response.json(dat)
    }
    else {
      dat.flag = 1
      dat.msg = data.length == 0 ? '空' : '插入成功'
      dat.data = data
      response.json(dat)
    }
  })
}


module.exports = {
  insert_residents,
  insert_user,

  insert_log,
  insert_strangelog,

  new_news
}
