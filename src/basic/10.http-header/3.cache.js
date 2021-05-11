const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const mime = require('mime')

// 缓存指的是静态文件的缓存
const server = http.createServer((req, res) => {
  let {
    pathname,
    query
  } = url.parse(req.url, true)

  let filePath = path.join(__dirname, 'public', pathname)

  res.setHeader('Cache-Control', 'no-cache')

  fs.stat(filePath, function (err, stateObj) {
    if (err) {
      res.statusCode = 404
      res.end('NOT FOUND')
    } {
      if (stateObj.isFile()) {
        // 根据文件内容 生成密钥
        let fileContent = fs.readFileSync(filePath)
        let etag = crypto.createHash('md5').update(fileContent).digest('base64')

        if (req.headers['if-none-match'] === etag) {
          res.statusCode = 304
          res.end()
        } else {
          res.setHeader('Etag', etag)
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