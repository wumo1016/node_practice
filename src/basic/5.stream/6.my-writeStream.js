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
    this.offset = options.start || 0
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

  clearBuffer() {
    if (this.cache.length > 0) {
      const target = this.cache.shift()
      this._write(target.chunk, target.encoding, target.cb)
    } else {
      this.writing = false
      if (this.needDrain) {
        this.emit('drain')
      }
    }
  }

  write(chunk, encoding = this.encoding, cb = () => {}) {
    // 因为需要将chunk和highWaterMark的长度进行对比 所以可以将数据全部转成buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    this.len += chunk.length
    let returnValue = this.len < this.highWaterMark
    this.needDrain = !returnValue
    // 扩展cb 在每次写完后方便清缓存中待写入的数据
    let userCb = cb 
    cb = () => {
      userCb()
      this.clearBuffer()
    }

    // 写入 判断是否是第一次写入 第一次直接调用fs.write 后面的先写入缓存
    if (!this.writing) {
      this.writing = true
      this._write(chunk, encoding, cb)
    } else {
      this.cache.push({
        chunk,
        encoding,
        cb
      })
    }
    return returnValue
  }

  _write(chunk, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chunk, encoding, cb))
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
      this.offset += written
      this.len -= written
      cb()
    })
  }

}


const ws = fs.createWriteStream(path.resolve(__dirname, './b.txt'), {
// const ws = new WriteStream(path.resolve(__dirname, './b.txt'), {
  highWaterMark: 4
})  

let i = 1

function write() {
  let flag = true
  while (i <= 20 && flag) {
    flag = ws.write(i++ + '')
  }
}
write()

ws.on('drain', () => { // 每次预期写完后 触发
  console.log('写完了');
  write()
})