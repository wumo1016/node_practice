/* 流的分类
  - 1.可读流
  - 2.可写流
  - 3.双工流
  - 4.转化流：压缩 转码
*/

const {
  Duplex,
  Transform
} = require('stream')

/* 双工流 */
class MyDupleex extends Duplex { // 可读可写
  _read() {

  }
  _write() {

  }
}

/* 转化流 */
// 比如将用户输入的转成大写再输出

// process.stdin.on('data', function (data) { // 标准输入
//   process.stdout.write(data) // 标准输出
// })

// process.stdin.pipe(process.stdout)

class MyTransform extends Transform {
  _transform(chunk, encoding, cb) {
    chunk = chunk.toString().toUpperCase()
    this.push(chunk) // 会触发emit('data')事件
    cb()
  }
}

let transform = new MyTransform()
process.stdin.pipe(transform).pipe(process.stdout)