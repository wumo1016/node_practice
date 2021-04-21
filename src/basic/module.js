// node中的模块 esm commonjs
// 用webpack打包后 会将es6打包为commonjs模块
// esm(支持tree-shaking)是静态模块  commonjs支持动态模块(可以在代码执行的时候引入模块)

/* commonjs规范
  - 1.每个文件都是一个模块(每个模块外面都是一个函数)
  - 2.文件如果需要被别人使用 就需要导出 module.exports = xx
  - 3.如果使用别人的模块 就需要导入 require
*/

/* 模块的分类
  - 1.核心模块、内置模块(node中自带的模块fs、http、vm)
  - 2.第三方模块(co)
  - 3.文件模块
*/

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


