// 如果想有提示就安装包 npm i @types/node

/* 方法总结
  - 静态方法
    - alloc
    - from
    - concat
    - isBuffer
  - 实例属性
    - length
    - byteLength 效果同length
  - 实例方法
    - slice
    - copy
    - indexof
  - 转化方法 例：Buffer.from('珠峰').toString('base64')
    - toString()
    - toString('utf8')
    - toString('base64')
*/

// alloc
(function () {
  const b = Buffer.alloc(5)
  console.log(b); // <Buffer 00 00 00 00 00>
  console.log(b[0]); // 可以用索引取值 取的值是10进制
});
// from
(function () {
  const b1 = Buffer.from([0x25, 0x64, 0x45]) // 超过ff就会储存为 00
  console.log(b1[0]); // 37
  const b2 = Buffer.from('珠峰')
  console.log(b2); // <Buffer e7 8f a0 e5 b3 b0> 一个汉字三个字节
});
// slice
(function () {
  let b = Buffer.from([1, 2, 3, 4, 5])
  console.log(b); // <Buffer 01 02 03 04 05>

  let b1 = b.slice(0, 1) // slice的数据都是引用地址
  console.log(b1); // <Buffer 01>
  b1[0] = 6
  console.log(b); // <Buffer 06 02 03 04 05>
});
// copy
(function () {
  let b1 = Buffer.from('舞')
  let b2 = Buffer.from('之')
  let b3 = Buffer.from('墨')
  // 自己实现copy
  Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
    console.log('mycopy');
    for (let i = sourceStart; i < sourceEnd; i++) {
      targetBuffer[targetStart++] = this[i]
    }
  }

  let b4 = Buffer.alloc(9)
  b1.copy(b4, 0, 0, 3) // 目标的开始位置 源的开始位置 源的结束位置
  b2.copy(b4, 3) // 后两位省略就是默认全部拷贝
  b3.copy(b4, 6)
  console.log(b4.toString()); // 舞之墨
});
// concat
(function () {
  let b1 = Buffer.from('舞')
  let b2 = Buffer.from('之')
  let b3 = Buffer.from('墨')

  // 自己实现concat
  Buffer.concat = function (bufferList, length = bufferList.reduce((a, b) => a + b.length, 0)) {
    let buffer = Buffer.alloc(length)
    let offset = 0
    bufferList.forEach(buf => {
      buf.copy(buffer, offset)
      offset += buf.length
    })
    return buffer
  }

  let b4 = Buffer.concat([b1, b2, b3])
  console.log(b4.toString()); // 舞之墨
})();

(function () {

})();




