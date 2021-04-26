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
    this.start = options.start || 0
    this.end = options.end
    this.highWaterMark = options.highWaterMark || 64 * 1024

    this.open()
    // 使用on绑定事件时 就会触发这个事件
    this.on('newListener', (type) => {
      if (type === 'data') {
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
    console.log(this.rfd);
  }

  destory(err) {
    this.emit('error', err)
  }

}

let rs = new ReadStream(path.resolve(__dirname, './a.txt'), {
  flags: 'r',
  encoding: null,
  autoClose: true,
  start: 0,
  highWaterMark: 3
})


// let t = setInterval(() => {
//   rs.resume()
// }, 1000);

rs.on('open', function (fd) {
  console.log('open', fd);
})

rs.on('data', function (chunk) {
  console.log(chunk);
  // rs.pause()
})

rs.on('end', function () {
  console.log('end');
  // clearInterval(t)
})

rs.on('close', function () {
  console.log('close');
})