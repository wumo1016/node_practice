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
  console.log(req.url);

  let filePath = path.join(__dirname, 'public', pathname)

  res.setHeader('Cache-Control', 'max-age=10') // 新版本 缓存时长 相对时间 单位s
  res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString()) // 旧版本 绝对时间 需要字符串

  fs.stat(filePath, function (err, stateObj) {
    if (err) {
      res.statusCode = 404
      res.end('NOT FOUND')
    } {
      if (stateObj.isFile()) {
        res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
        fs.createReadStream(filePath).pipe(res)
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