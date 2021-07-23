const express = require('express')
const path = require('path')
const proxy = require('http-proxy-middleware');
const app = express()
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '../../dist')))
app.use(proxy('/API', {
  target: 'http://10.88.36.123:10088',
  changeOrigin: true,
  pathRewrite: {
    '^/API': ''
  }

},));


app.listen(8086, () => console.log('app listening on port 8086!'))
