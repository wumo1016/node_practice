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

  let filePath = path.join(__dirname, 'public', pathname)

  // 缓存类型：disk cache memory cache
  /* Cache-Control常见值
    - no-cache(每次都向服务器发送请求，会存到浏览器的缓存)
    - no-store(每次都向服务器要，但是不会缓存到浏览器中)
    - 如果服务器每次都返回最新的 就会用最新的内容
  */
  // Cache-Control与Expires效果相同 有些旧版本浏览器只支持Expires 所以一般都写，而且时间要一致
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