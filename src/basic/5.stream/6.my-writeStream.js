const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')

class WriteStream extends EventEmitter {
  constructor(path, options) {
    super()
    this.path = path
    this.flag = options.flag || 'w'
    this.encoding = options.encoding || 'utf8'
    this.mode = options.mode || 0o666
    this.emitClose = options.emitClose || true
    this.start = options.start || 0
    this.highWaterMark = options.highWaterMark || 16 * 1024

    this.len = 0 // 缓存区大小 调用write但未写入的数据
    this.needDrain = true
    this.cache = []
    this.writing = false // 是否是第一次写入

    this.open()
  }

  open() {
    fs.open(this.path, this.flag, this.mode, (err, fd) => {
      this.fd = fd
      this.emit('open', fd)
    })
  }

  write(chunk, encoding = this.encoding, cb = () => {}) {
    // 因为需要将chunk和highWaterMark的长度进行对比 所以可以将数据全部转成buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    this.len += chunk.length
    let returnValue = this.len < this.highWaterMark
    this.needDrain = !returnValue
    // 写入 判断是否是第一次写入 第一次直接调用fs.write 后面的先写入缓存
    if (!this.writing) {
      this.writing = true
      console.log('真正写入');
    } else {
      console.log('保存到缓存区');
      this.cache.push({
        chunk,
        encoding,
        cb
      })
    }
    return returnValue
  }

}


// const ws = fs.createWriteStream(path.resolve(__dirname, './b.txt'), {
const ws = new WriteStream(path.resolve(__dirname, './b.txt'), {
  highWaterMark: 4
})

let i = 1

function write() {
  let flag = true
  while (i < 10 && flag) {
    flag = ws.write(i++ + '')
  }
}
write()

ws.on('drain', () => { // 每次预期写完后 触发
  console.log('写完了');
  write()
})