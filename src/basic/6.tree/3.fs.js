/* fs
  - 目录操作
    - mkdir：异步创建目录
  - stat：描述文件(包括文件或文件夹)的状态，如果不存在，就会发生错误
*/

// const fs = require('fs')
const {
  existsSync
} = require('fs')
const fs = require('fs').promises // 将所有方法promise方法取出 node11之后

/* fs.mkdir('a', function(err){
  console.log('创建成功');
})
 */

/* // 创建目录中的目录 前提是父目录已经存在
fs.mkdir('a/b', function (err) {
  console.log('创建成功');
})
 */

/* // 异步创建多级目录
function mkdir(pathStr, cb) {
  let pathList = pathStr.split('/')
  let index = 1

  function make(err) {
    if (err) return cb(err)
    if (index === pathList.length + 1) return cb()
    let cp = pathList.slice(0, index++).join('/')
    fs.stat(cp, function (err) {
      if (err) {
        fs.mkdir(cp, make)
      } else {
        make()
      }
    })
  }
  make()
}

mkdir('a/b/c/d', function (err) {
  if (err) return console.log(err);
  console.log('创建成功');
}) */


// 同步创建多级目录
async function mkdir(pathStr) {
  let pathList = pathStr.split('/')
  for (let i = 1; i <= pathList.length; i++) {
    let cp = pathList.slice(0, i).join('/')
    if (!existsSync(cp)) {
      await fs.mkdir(cp)
    }
  }
}

mkdir('a/b/c/d').then(() => {
  console.log('创建成功');
}).catch(err => {
  console.log(err);
})











//