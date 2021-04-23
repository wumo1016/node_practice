// 如果想有提示就安装包 npm i @types/node

// 创建1
function test1() {
  const b1 = Buffer.alloc(5)
  console.log(b1); // <Buffer 00 00 00 00 00>
  console.log(b1[0]); // 可以用索引取值 取的值是10进制
}

// 创建2
function test2() {
  const b2 = Buffer.from([0x25, 0x64, 0x45]) // 超过ff就会储存为 00
  console.log(b2[0]); // 37
}

// 创建3
function test3() {
  const b3 = Buffer.from('珠峰')
  console.log(b3); // <Buffer e7 8f a0 e5 b3 b0> 一个汉字三个字节
}


