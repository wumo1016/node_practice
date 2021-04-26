const path = require('path')
const fs = require('fs')
const EventEmitter = require('events')

class ReadStream extends EventEmitter {
  constructor(path, options) {
    super()
    this.path = path
    this.options = options
    this.flags = options.flags || 'r'
    this.encoding = options.encoding || null
    this.autoClose = options.autoClose || true
    this.offset = options.start || 0 // 源文件的读取位置
    this.end = options.end // 源文件的结束位置
    this.highWaterMark = options.highWaterMark || 64 * 1024 // 每次读取几个字节
    this.flowing = false // 是否是流动状态

    this.open()
    // 使用on绑定事件时 就会触发这个事件 type就是事件名
    this.on('newListener', (type) => {
      if (type === 'data') {
        this.flowing = true
        this.read()
      }
    })
  }

  open() {
    fs.open(this.path, this.flags, (err, rfd) => {
      if (err) return this.destory(err)
      this.rfd = rfd
      this.emit('open', rfd)
    })
  }

  read() {
    if (typeof this.rfd !== 'number') {
      return this.once('open', () => this.read())
    }
    // 读取文件中的内容
    const buf = Buffer.alloc(this.highWaterMark)

    const offset = this.end === undefined ?
      this.highWaterMark : Math.min((this.end - this.offset + 1), this.highWaterMark)
    fs.read(this.rfd, buf, 0, offset, this.offset, (err, number) => {
      if (number) {
        this.offset += number
        this.emit('data', buf.slice(0, number))
        if (this.flowing) { // 是否处理流动状态
          this.read()
        }
      } else {
        this.emit('end')
        fs.close(this.rfd, () => {
          if (this.autoClose) {
            this.emit('close')
          }
        })
      }
    })
  }

  pause() {
    this.flowing = false
  }

  resume() {
    if (!this.flowing) {
      this.flowing = true
      this.read()
    }
  }

  destory(err) {
    this.emit('error', err)
  }

}

let rs = new ReadStream(path.resolve(__dirname, './a.txt'), {
  // let rs = fs.createReadStream(path.resolve(__dirname, './a.txt'), {
  flags: 'r',
  encoding: null,
  autoClose: true,
  start: 0,
  // end: 1, // 包括end位
  highWaterMark: 3
})

/* rs.on('open', function (fd) {
  console.log('open', fd);
})

rs.on('data', function (chunk) {
  console.log('data', chunk);
})

rs.on('end', function () {
  console.log('end');
})

rs.on('close', function () {
  console.log('close');
}) */

let t = setInterval(() => {
  rs.resume()
}, 1000);

rs.on('open', function (fd) {
  console.log('open', fd);
})

rs.on('data', function (chunk) {
  console.log('data', chunk);
  rs.pause()
})

rs.on('end', function () {
  console.log('end');
  clearInterval(t)
})

rs.on('close', function () {
  console.log('close');
})