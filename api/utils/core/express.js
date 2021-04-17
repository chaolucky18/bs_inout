/**
 * ajax 响应核心模块
 */

const express = require('express')
const app = express()
let bodyParser = require('body-parser')
const port = 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.listen(port, () => {
  console.log('running at 127.0.0.1:' + port)
})

app.get('/', (req, res) => {
  res.send('路径错误')
})


module.exports = app