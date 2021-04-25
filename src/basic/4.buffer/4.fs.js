/* fs
  - 静态方法
    - readFile(path, callback)
    - writeFile(path, data: string | buffer, callback)
    - copyFile
    - open(path, flags, callback)
    - read(fd, buffer, offset, length, positon, callback)
      - offset：buffer的开始位置
      - length：写入buffer的长度
      - position：从文件的第六个开始取值然后写入
    - write(fd, buffer, offset, length, positon, callback)
    - close
  - 读文件
    - 不写编码 默认就是buffer
    - 如果文件不存在 就报错
  - 写文件 
    - 默认以utf8格式写入 会将数据调用 toString() 然后再写入
*/

const fs = require('fs')
const path = require('path')

/* readFile writeFile */
// fs.readFile(path.resolve(__dirname, './a.json'), function (err, data) {
//   if (err) return console.log(err);
//   fs.writeFile(path.resolve(__dirname, './b.json'), data, function (err, data) {
//     console.log(data);
//   })
// })

/* open write */
// r代表读 w代表都 a代表追加
// fd file descriptor 是一个number类型

let buf = Buffer.alloc(3)
fs.open(path.resolve(__dirname, './a.txt'), 'r', function (err, fd) {
  fs.read(fd, buf, 0, 3, 6, function(err, rnumber){ // rnumber 读取到的真实个数
    // console.log(rnumber);
    fs.open(path.resolve(__dirname, './b.txt'), 'w', function(err, wfd){
      fs.write(wfd, buf, 0, 3, 0, function(err, wnumber){
        console.log(wnumber);
        fs.close(fd, () => {}) // 最终读完之后 要关闭文件
        fs.close(wfd, () => {})
      })
    })
  })
})

// 