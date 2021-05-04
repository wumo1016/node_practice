/* pipe
  pipe的目的是 读取一点写入一点 监听可读流的触发事件，将获取到的数据写入到可写流中区去
  如果返回的false就暂停读取 读取完成后触发drain事件 再继续读取 直到读取完毕
  缺点是无法操作读取到的数据 如果需要操作 需要使用on('data')
*/

const fs = require('fs')
const path = require('path')

const ReadStream = require('./2.my-readStream')
const WriteStream = require('./6.my-writeStream')

/* const rs = fs.createReadStream(path.resolve(__dirname, './a.txt'), {
  highWaterMark: 4
})
const ws = fs.createWriteStream(path.resolve(__dirname, './b.txt'), {
  highWaterMark: 1
})

rs.on('data', function (data) {
  let flag = ws.write(data)
  if (!flag) {
    rs.pause()
  }
})

ws.on('drain', function () {
  console.log('drain');
  rs.resume()
}) */

const rs = new ReadStream(path.resolve(__dirname, './a.txt'), {
  highWaterMark: 4
})
const ws = new WriteStream(path.resolve(__dirname, './b.txt'), {
  highWaterMark: 1
})

rs.pipe(ws)