const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const querystring = require('querystring')

const mime = require('mime')

const server = http.createServer((req, res) => {
  let {
    pathname,
    query
  } = url.parse(req.url, true)
  let origin = req.headers.origin
  // if (origin) {
  //   res.setHeader('Access-Control-Allow-Origin', origin) // cookie跨域不能使用*
  //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token') // 允许自定义Content-Type
  //   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS')
  //   res.setHeader('Access-Control-Allow-Credentials', true)
  //   res.setHeader('Access-Control-Max-Age', '10') // 每个10s发一次options请求
  //   if (req.method === 'OPTIONS') { // 如果是options请求 直接成功返回
  //     return res.end()
  //   }
  // }

  // 后端路由 一般根据请求路径和方法进行处理
  if (pathname === '/login' && req.method === 'POST') {
    res.setHeader('Set-Cookie', 'a=1')
    let buffer = []
    req.on('data', function (chunk) {
      buffer.push(chunk)
    })
    req.on('end', function () {
      // 前端传递的数据
      let buf = Buffer.concat(buffer)
      let ctype = req.headers['content-type']
      // http1.0的特点 需要根据请求头
      if (ctype === 'application/json') {
        let obj = JSON.parse(buf.toString())
        // res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(obj))
      } else if (ctype === 'text/plain') {
        xhr.setHeader('Content-Type', 'text/plain')
        res.end(buf.toString())
      } else if (ctype === 'application/x-www-form-urlencoded') {
        let obj = querystring.parse(buf.toString(), '&', '=') // 默认对应的数据格式 a=1&b=2
        res.end(JSON.stringify(obj))
      } else {
        console.log(buf.toString());
        res.end('ok')
      }
    })
  } else {
    let filePath = path.join(__dirname, pathname)
    fs.stat(filePath, function (err, stateObj) {
      if (err) {
        return sendError(res)
      }

      if (stateObj.isFile()) {
        res.setHeader('Content-Type', mime.getType(requestFile) + ';charset=utf-8')
        fs.createReadStream(requestFile).pipe(res)
      } else {
        let htmlPath = path.join(filePath, 'index.html')
        fs.access(htmlPath, function (err) {
          if (err) {
            sendError(res)
          } else {
            res.setHeader('Content-Type', 'text/html;charset=utf-8')
            fs.createReadStream(htmlPath).pipe(res)
          }
        })
      }
    })
  }
})

function sendError(res) {
  res.statusCode = 404
  res.end('NOT FOUND')
}


server.listen(3000, function () {
  console.log('server start');
})