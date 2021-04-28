/* 可写流
  - 由于write的方法市异步的 所以多个write方法操作同一个文件 就会又出错的情况
  - 除了第一次的write 可以将其他的进行排队 等待一个完成后 清空缓存区
 */

const fs = require('fs')
const path = require('path')

/* let ws = fs.createWriteStream(path.resolve(__dirname, './b.txt'), {
  flags: 'w',
  encoding: 'utf8',
  start: 0,
  highWaterMark: 3 // 期望用多少内存写入
})

ws.on('open', function (fd) {
  console.log('open', fd);
})

let canWrite = ws.write('1')
console.log(canWrite);
canWrite = ws.write('1')
console.log(canWrite);
canWrite = ws.write('1')
console.log(canWrite);
canWrite = ws.write('1')
console.log(canWrite);

ws.on('close', function (fd) {
  console.log('open', fd);
}) */

const rs = fs.createReadStream(path.resolve(__dirname, './a.txt'), {
  highWaterMark: 3
})

const ws = fs.createWriteStream(path.resolve(__dirname, './b.txt'), {
  highWaterMark: 4
})

rs.on('data', function (data) {
  let flag = ws.write(data)
  if (!flag) {
    console.log('吃不下');
    rs.pause()
  }
})

ws.on('drain', function () { // 当前写入已经完毕
  console.log('吃完了');
  rs.resume()
})