/* 可读流 
  - 介绍：不是一次性将文件读取完毕 而是可以控制读取的个数和速率
  - createReadStream：读取流
*/

const path = require('path')
const fs = require('fs') // 基于stream模块底层扩展了一个文件读写方法

let rs = fs.createReadStream(path.resolve(__dirname, './a.txt'), {
  flags: 'r', // 默认
  encoding: null, // 默认buffer
  autoClose: true,
  start: 0,
  highWaterMark: 3 // 每次读取数据个数 默认是 64*1024
})

let t = setInterval(() => {
  rs.resume() // 重新开始读取
}, 1000);

rs.on('open', function (fd) { // 文件读取后触发
  console.log('open', fd);
})

rs.on('data', function (chunk) {
  console.log(chunk);
  rs.pause() // 暂停读取
})

rs.on('end', function () { // 文件读取结束后触发
  console.log('end');
  clearInterval(t)
})

rs.on('close', function () { // 文件关闭后触发
  console.log('close');
})



// 