// 1.如果使用node执行一个文件 那么这个文件会被当成一个模块 默认修改了this(默认值为{})

// 2.在node中方便变量需要通过global

// 3.自执行函数中的this就是global
// (function(){
//   console.log(this);
// })()

// 4.默认打印global会隐藏调很多属性，如果想查看所有属性，需要开启
// console.dir(global, { showHidden: true });

// 5.Buffer node中的二进制对象 (最开始的时候浏览器不能直接读取文件)

// 6.__dirname __filename 都是绝对路径
// console.log(__dirname); // 当前文件所在的目录路径(g:\wumo\node_practice\basic)
// console.log(__filename); // 当前文件路径(g:\wumo\node_practice\basic\1.简介.js)

// 7.process   
//  - platform 平台(win32/darwin)
//  - cwd(current working direction) 当前工作目录，运行目录
//  - env 环境变量(用户变量+系统变量)
//  - argv (两个参数 1:执行node所在的文件 2.当前执行的问价 ..后面就是用户执行命令时传入的参数)
//  - nextTick node自己实现的 优先级比promise高
//  - chdir 改变工作目录

// 8.EventLoop
/*
本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
|   执行延迟到下一个循环迭代的 I/O 回调。
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
|   仅系统内部使用。
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘
|  检索新的I/O事件;执行与 I/O相关的回调┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  setImmediate() 回调函数在这里执行。 └───────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │
│  └─────────────┬─────────────┘
|  一些关闭的回调函数
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
*/

// 9. require exports module __dirname __filename 也叫全局属性 但是不在global上
// 因为每个文件都是一个模块 而模块的实现是靠函数 上面五个属性就是函数的参数


// 10.模块化规范 commonjs amd cmd umd(commonjs+amd+cmd) esm
// 最早是为了解决命名冲突问题




/* --------------------------------------------------------------------------- */

/* env相关
win设置环境变量
set a=1
mac设置环境变量
export a=1
*/

/* argv相关
执行命令 node 1.js --port 3000 --info abc
console.log(process.argv)
结果：
[
  'C:\\Program Files\\nodejs\\node.exe',
  'G:\\wumo\\node_practice\\basic\\1.js',
  '--port',
  '3000',
  '--info',
  'abc'
]
解析参数：
console.log(process.argv.slice(2).reduce((memo, current, index, arr) => {
  if (current.startsWith('--')) {
    memo[current.slice(2)] = arr[index + 1]
  }
  return memo
}, {}));

一般使用库 commander args等
// 测试命令 node 1.js --port 3000 --file xxx
const program = require('commander')
program.option('-p, --port <n>', 'set user port') // 简称 全称 值 提示信息
program.option('-f, --file <n>', 'set user directory')
program.parse(program.env)
console.log(program.opts()); // { port: '3000', file: 'xxx' } 参数需要先配置
*/

/* nextTick
Promise.resolve().then(_ => {
  console.log('then');
})
process.nextTick(() => {
  console.log('nextTick');
})
// nextTick
// then
*/


/* EventLoop

// 示例1：
// 有可能setImmediate先走 因为setTimeout计时器受进程性能的影响
setTimeout(() => {
  console.log('setTimeout');
})
setImmediate(() => {
  console.log('setImmediate');
})
// setTimeout
// setImmediate

// 示例2：
const fs = require('fs')
fs.readFile('README.md', 'utf8', () => {
  setTimeout(() => {
    console.log('setTimeout');
  })
  setImmediate(() => {
    console.log('setImmediate');
  })
})
// setImmediate
// setTimeout
// 文件读取属于poll阶段


*/