/**
 * ajax 请求响应
 */

let app = require('./core/express')
let q = require('./data/query')
let i = require('./data/insert')
let u = require('./data/update')

// 返回值模板
let dat = {
  flag: 0,
  msg: '',
  data: {}
}

/************** 查询部分 **************/

/**
 * 管理员信息查询部分
 */

// 查询所有user
app.get('/getalluser', (req, res) => {
  q.query_users(res)
})

// 通过user ID 查询user
app.get('/getuser', (req, res) => {
  if (req.query.id == undefined) {
    dat.msg = 'ID不为空！'
    res.json(dat)
    return
  }
  q.query_user_byId(req.query.id, res)
})



/**
 * 居民信息查询部分
 */

// 获取所有居民信息
app.get('/queryall', (req, res) => {
  q.query_residents(res)
})

// 根据ID查询居民信息
app.get('/query_a_resident', (req, res) => {
  if (req.query.info == undefined) {
    dat.msg = '居民ID或姓名不得为空！'
    res.json(dat)
    return
  }
  q.query_a_resident(req.query.info, res)
})

// 根据楼栋查询居民信息
app.get('/query_building', (req, res) => {
  if (req.query.building == undefined) {
    dat.msg = '楼栋号不得为空！'
    res.json(dat)
    return
  }
  q.query_building(req.query.building, res)
})

// 根据ID查询用户进出数据
app.get('/query_resident_inoutdata', (req, res) => {
  if (req.query.id == undefined) {
    dat.msg = '用户ID不得为空！'
    res.json(dat)
    return
  }
  q.query_resident_inoutdata(req.query.id, res)
})


/**
* 登陆部分
*/

// 登陆
app.post('/login', (req, res) => {
  if (req.body.username || req.body.passwd) {
    q.login(req.body, res)
  }
  else {
    dat.msg = '账号或密码不得为空！'
    res.json(dat)
  }
})

/**
 * 仪表板数据部分
 */
app.get('/dashboard', async (req, res) => {
  let datas = await q.dashboard()
  // q.recent()
  dat.data = {
    overall: {
      in: datas.in,
      out: datas.out,
      warn: datas.warn,
      strange: datas.strange
    },
    recentInOut: datas.rows,
    recentWarn: datas.warnRows == [] ? {} : datas.warnRows,
    recentStrange: datas.strangeRows
  }
  res.json(dat)
})

/**
 * 进出数据部分
 */


/************** 插入部分 **************/

// 新居民
app.post('/new_resident', (req, res) => {
  let data = req.body
  if (data.name || data.sex || data.phone || data.building || data.unit || data.room) {
    i.insert_residents(data, res)
  }
  else {
    dat.msg = '数据错误'
    res.json(dat)
  }
})

// 新管理
app.post('/new_user', (req, res) => {
  let data = req.body
  if (data.username || data.paswd || data.name) {
    i.insert_user(req.body, res)
  }
  else {
    dat.msg = '数据错误'
    res.json(dat)
  }
})

// 新居民进出记录
app.post('/new_log', (req, res) => {
  let data = req.body
  if (data.temperature || data.door) {
    i.insert_log(req.body, res)
  }
  else {
    dat.msg = "数据不能有空！"
    res.json(dat)
  }
})

// 新居民进出记录
app.post('/new_strangelog', (req, res) => {
  let data = req.body
  if (data.temperature || data.door || data.phone || data.resId) {
    i.insert_strangelog(req.body, res)
  }
  else {
    dat.msg = "数据不能有空！"
    res.json(dat)
  }
})

// 新闻获取记录
app.get('/news', async (req, res) => {
  let data = await q.get_news()
  dat = {
    flag: 1,
    msg: "获取成功",
    data: data
  }
  res.json(dat)
})

// 新增信息
app.post('/newnews', (req, res) => {
  let data = req.body
  if (data.title || data.content || data.author) {
    i.new_news(req.body, res)
  }
  else {
    dat.msg = "数据不能有空！"
    res.json(dat)
  }
})