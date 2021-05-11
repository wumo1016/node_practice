// crypto 是node中内置的用于加密的包 包括各种加密算法和摘要算法

/* 1.md5
  - hash算法 摘要算法
  - 不可逆
  - 摘要的内容不同 结果完全不同(雪崩效应)
  - 摘要不同的内容 长度是一样的
*/

const crypto = require('crypto')
// update 中是摘要的内容 digest 是摘要的格式
let r1 = crypto.createHash('md5').update('abcd').digest('base64')
let r2 = crypto.createHash('md5').update('a').update('bcd').digest('base64')
console.log(r1 === r2); // true


/* 2.加盐算法 密钥
  - 可以把密钥生成一个1k大小的 随机的字符
*/

let r3 = crypto.createHmac('sha256', 'wyb').update('abcd').digest('base64')
console.log(r3);
