const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const querystring = require('querystring')
// 第三方模块
const mime = require('mime')
const uuid = require('uuid');

const uploadPath = path.resolve(__dirname, 'upload');

Buffer.prototype.split = function (sep) {
  let len = Buffer.from(sep).length
  let offset = 0,
    current;
  let list = []
  while (-1 !== (current = this.indexOf(sep, offset))) {
    list.push(this.slice(offset, current))
    offset = current + len
  }
  list.push(this.slice(offset));
  return list
}

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
      } else if (ctype.startsWith('multipart/form-data')) {
        let boundary = '--' + ctype.split('=')[1]
        let lines = buf.split(boundary).slice(1, -1); // 前后两段是不需要的
        const r = {};
        lines.forEach(line => {
          // 把header 和 内容进行拆分
          let [head, body] = line.split(`\r\n\r\n`); // head和body中间两个换行两个个回车
          head = head.toString();
          let name = head.match(/name="(.+?)"/)[1];
          if (head.includes('filename')) {
            // 文件上传  将文件内容上传到服务器的上传文件夹中
            let buffer = line.slice(head.length + 4, -2);
            let filename = uuid.v4();
            // 你最终创建完名字之后 还会同步到数据库里
            // 下次查找数据库，再找到对应的文件名
            fs.writeFileSync(path.join(uploadPath, filename), buffer)
            r[name] = {
              filename,
              size: buffer.length
            }
          } else {
            r[name] = body.toString().slice(0, -2)
          }
        })
        res.end(JSON.stringify(r));
      } else {
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
        res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
        fs.createReadStream(filePath).pipe(res)
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