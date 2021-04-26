/* 可写流
  - 由于write的方法市异步的 所以多个write方法操作同一个文件 就会又出错的情况
  - 除了第一次的write 可以将其他的进行排队 等待一个完成后 清空缓存区
 */

const fs = require('fs')
const path = require('path')
let ws = fs.createWriteStream(path.resolve(__dirname, './b.txt'), {
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
})