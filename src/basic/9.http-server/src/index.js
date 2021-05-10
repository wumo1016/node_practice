const http = require('http')
const os = require('os')
const interfaces = os.networkInterfaces()
const url = require('url')
const path = require('path')
const fs = require('fs').promises
const {
  createReadStream
} = require('fs')

const chalk = require('chalk') // 给命令行添加颜色
const mime = require('mime') // Content-Type对照表
const ejs = require('ejs')

let ips = Object.values(interfaces).
reduce((memo, cur) => memo.concat(cur), []).
filter(item => item.family === 'IPv4' && item.cidr.startsWith('192'))

class Server {
  constructor(options) {
    this.port = options.port
    this.directory = options.directory
    this.cache = options.cache
    this.gzip = options.gzip
  }

  async handleRequest(req, res) {
    // 获取请求路径 以当前目录位基准查找文件 如果文件存在不是文件夹就直接返回
    let {
      pathname
    } = url.parse(req.url)
    let requestPath = path.join(this.directory, decodeURIComponent(pathname)) // 因为pathname的中文会被转义
    try {
      let stateObj = await fs.stat(requestPath)
      if (stateObj.isFile()) {
        this.sendFile(req, res, requestPath)
      } else {
        const dirs = await fs.readdir(requestPath)
        const html = await ejs.renderFile(path.resolve(__dirname, './template.html'), {
          dirs: dirs.filter(v => v !== 'node_modules').map(dir => {
            return {
              name: dir,
              url: path.join(pathname, dir)
            }
          })
        })
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(html)
      }
    } catch (e) {
      console.log(e);
      this.sendError(req, res, e)
    }
  }

  start() {
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(this.port, () => {
      console.log(chalk.yellow('Starting up wumo-server, serving...'));
      console.log(chalk.yellow('Available on:'));
      ips.map(ip => {
        console.log(`   http://${ip.address}:${chalk.green(this.port)}`);
      })
      console.log(`   http://127.0.0.1:${chalk.green(this.port)}`);
    })

    server.on('error', (err) => {
      // 如果端口被占用 自动累加1
      if (err.errno === 'EADDRINUSE') {
        this.port++
        server.listen(this.port) // 因为已经订阅过了，所以不需要再次绑定
      }
    })
  }

  sendFile(req, res, requestFile) {
    // 返回文件 需要给浏览器提供内容类型和内容的编码格式
    res.setHeader('Content-Type', mime.getType(requestFile) + ';charset=utf-8')
    // 边读边写给浏览器
    createReadStream(requestFile).pipe(res)
  }

  sendError(req, res, e) {
    res.statusCode = 404
    res.end('Not Found')
  }
}

module.exports = Server