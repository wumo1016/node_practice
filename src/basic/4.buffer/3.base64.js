
// base64 可以放到任何路径中 可以减少请求 但文件会变大 比原来大1/3

const r = Buffer.from('吴').toString('base64')
console.log(r); // 5ZC0 四个字节 原来是三个字节

// base64就是将每个字节转化成 小于64的值
const b1 = Buffer.from('吴')
console.log(b1); // <Buffer e5 90 b4>
console.log(0xe5.toString(2), 0x90.toString(2), 0xb4.toString(2));
// 11100101 10010000 10110100 3 * 8 => 4 * 6
// 为什么拆为最大6位 因为就是要小于64
// 111001 011001 000010 110100 => 转换为10进制 57 25 2 52
console.log(parseInt('111001', 2), parseInt('011001', 2), parseInt('000010', 2), parseInt('110100', 2),);

let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str += str.toLocaleLowerCase()
str += '0123456789+/'
console.log(str[57] + str[25] + str[2] + str[52]); // 5ZC0
