const path = require('path')
const fs = require('fs')
// 普通写入文件到硬盘
fs.writeFileSync(path.resolve(__dirname, '1.txt'), '123456')
let res1 = fs.readFileSync(path.resolve(__dirname, '1.txt'), 'utf8')
console.log(res1); // 123456

// 写入内存
const MemoryFileSystem = require('memory-fs')
const mfs = new MemoryFileSystem()
mfs.mkdirpSync(path.resolve('dir'))
mfs.writeFileSync(path.resolve('dir/2.txt'), 'hello')
let res2 = mfs.readFileSync(path.resolve('dir/2.txt'), 'utf8')
console.log(res2); // hello
