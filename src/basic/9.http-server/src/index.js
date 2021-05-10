const http = require('http')
const os = require('os')
const chalk = require('chalk') // 给命令行添加颜色
const interfaces = os.networkInterfaces()

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

  start() {
    let server = http.createServer((req, res) => {})
    server.listen(this.port, () => {
      console.log(chalk.yellow('Starting up wumo-server, serving...'));
      console.log(chalk.yellow('Available on:'));
      ips.map(ip => {
        console.log(`   http://${ip.address}:${chalk.green(this.port)}`);
      })
      console.log(`   http://127.0.0.1:${chalk.green(this.port)}`);
    })
  }
}

module.exports = Server