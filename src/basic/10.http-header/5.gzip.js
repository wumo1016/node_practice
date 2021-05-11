const zlib = require('zlib')
const fs = require('fs')
const path = require('path')
let content = fs.readFileSync(path.resolve(__dirname, './1.txt'))

// 读一下压缩一点
// 压缩 webpack做 或 服务端做
// gzip不适合重复率低的内容 gzip的核心就是相同替换的方案
// 根据后缀做gzip处理

zlib.gzip(content, function (err, data) {
  console.log(err, data);
})