const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

const mime = require('mime')

// 缓存指的是静态文件的缓存
const server = http.createServer((req, res) => {
  let {
    pathname,
    query
  } = url.parse(req.url, true)

  // console.log(req.url);

  let filePath = path.join(__dirname, 'public', pathname)

  res.setHeader('Cache-Control', 'no-cache')

  fs.stat(filePath, function (err, stateObj) {
    if (err) {
      res.statusCode = 404
      res.end('NOT FOUND')
    } {
      if (stateObj.isFile()) {
        const ctime = stateObj.ctime.toUTCString()
        if (req.headers['if-modified-since'] === ctime) {
          res.statusCode = 304 // 去浏览器缓存中找
          res.end() // 表示服务器没有响应结果
        } else {
          res.setHeader('Last-Modified', ctime)
          res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
          fs.createReadStream(filePath).pipe(res)
        }
      } else {
        let htmlPath = path.join(filePath, 'index.html')
        fs.access(htmlPath, function (err) {
          if (err) {
            res.statusCode = 404
            res.end('NOT FOUND')
          } else {
            res.setHeader('Content-Type', 'text/html;charset=utf-8')
            fs.createReadStream(htmlPath).pipe(res)
          }
        })
      }
    }
  })
})

server.listen(3000, () => {
  console.log('server runing...');
})