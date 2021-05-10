const options = {
  port: {
    option: '-p, --port <n>',
    default: 8080,
    usage: 'ws --port 8080',
    message: 'set ws port'
  },
  gzip: {
    option: '-g, --gzip <n>',
    default: 1,
    usage: 'ws --gzip 0', // 禁用压缩
    message: 'set ws gzip'
  },
  cache: {
    option: '-c, --cache <n>',
    default: 1,
    usage: 'ws --cache 0', // 禁用缓存
    message: 'set ws cache'
  },
  directory: {
    option: '-d, --directory <d>',
    default: process.cwd(),
    usage: 'ws --directory d:', // 禁用缓存
    message: 'set ws directory'
  }
}

module.exports = options