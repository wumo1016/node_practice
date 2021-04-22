// node中的模块 esm commonjs
// 用webpack打包后 会将es6打包为commonjs模块
// esm(支持tree-shaking)是静态模块  commonjs支持动态模块(可以在代码执行的时候引入模块)
// 模块中 this === module.exports

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
global.a = 123
const vm = require('vm')
vm.runInThisContext('console.log(a)') // 123
vm.runInNewContext('console.log(a)') // undefined

/* require的实现
  - 1.读取文件
  - 2.读取后将文件包装一个函数
  - 3.通过runInThisContext将他变成js语法
  - 4.调用这个函数
*/

/* require的源码实现
  - 1.先调用 Module.prototype.require 方法
  - 2.Module._load 加载模块
  - 3.Module._resolveFilename 解析文件路径 将其变成绝对路径
  - 4.new Module 创建新的模块 this.id = 文件的绝对路径 this.exports = {}
  - 5.module.load
    - 根据扩展名使用策略模式，不同文件使用不同的加载方法，默认有三种 .js .json .node
    - 同步读取文件 const content = fs.readFileSync
    - module._compile(content)
    - Module.wrap(content) 将其包装到一个函数中
      Module.wrapper[0] + script + Module.wrapper[1]
      const wrapper = [
        '(function (exports, require, module, __filename, __dirname) { ',
        '\n});'
      ];
    - vm.runInThisContext 将其变成js执行
    - compiledWrapper.call(thisValue, exports, require, module, filename, dirname) 执行
  - 6.最终返回的是 module.exports
*/



/* 调试node
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-node",
      "request": "launch",
      "name": "run module",
      "skipFiles": [ // 默认跳过node所有源码 如果需要请删除
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}\\src\\test\\b.js"
    }
  ]
}

1.直接在 vscode中调试
2.在chrome中调试
  - 在调试文件的目录终端下，输入命令：node --inspect-brk b.js
  - 打开chrome的调试器 地址栏输入： chrome://inspect
  - 等待一会 点击inspect 会有一个弹框用于调试
3.命令行调试

*/