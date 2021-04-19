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
//  - nextTick
//  - chdir 改变工作目录

// 测试命令 node 1.js --port 3000 --file xxx
const program = require('commander')
program.option('-p, --port <n>', 'set user port') // 简称 全称 值 提示信息
program.option('-f, --file <n>', 'set user directory')
program.parse(program.env)
console.log(program.opts()); // { port: '3000', file: 'xxx' } 参数需要先配置



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
*/
