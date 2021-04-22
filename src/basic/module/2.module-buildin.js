/* fs */
// const fs = require('fs')
// const r = fs.readFileSync('./index.js', 'utf-8')
// const exist = fs.existsSync('./index.js') // 返回布尔值 文件是否存在
// console.log(exist);

/* path */
// const path = require('path')
// // 它会将传入的字符串拼接上当前工作目录路径
// console.log(path.resolve('a', 'b', 'c')); // D:\wumo\node\node_practice\src\basic\a\b\c
// // 它会将传入的字符串拼接上当前文件目录路径
// console.log(path.resolve(__dirname, 'a', 'b', 'c')); // D:\wumo\node\node_practice\src\basic\a\b\c
// // 解析过程中如果又 / 会直接返回根目录 然后再拼上后面的
// console.log(path.resolve(__dirname, 'a', '/', 'b')); // d:\b
// // 单纯拼接路径
// console.log(path.join('a', 'b', '/', 'c')); // a\b\c
// // 如果想把 / 也拼接进去 可以使用 join
// console.log(path.join(__dirname, 'a', '/', 'b', 'c')); // d:\wumo\node\node_practice\src\basic\a\b\c
// // 获取文件的扩展名
// console.log(path.extname('index.js')); // .js
// // 获取文件名(不包括扩展名)
// console.log(path.basename('index.js', '.js')); // index
// // 获取当前文件相对路径
// console.log(path.relative('a/b/c/1.js', 'a')); // ..\..\..
// // 获取当前文件的父路径
// console.log(path.dirname('index.js')); // .

/* vm */
/* require获得的都是字符串 如何变成js执行 */
// global.a = 123
// const vm = require('vm')
// vm.runInThisContext('console.log(a)') // 123
// vm.runInNewContext('console.log(a)') // undefined