const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

const mime = require('mime')

const server = http.createServer((req, res) => {
  let {
    pathname,
    query
  } = url.parse(req.url, true)

  // 后端路由 一般根据请求路径和方法进行处理
  if (pathname === '/login' && req.method === 'POST') {
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
        res.end(JSON.stringify(obj))
      } else if (ctype === 'text/plain') {
        res.end(buf.toString())
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