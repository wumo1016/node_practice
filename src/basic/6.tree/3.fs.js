/* fs
  - 目录操作
    - mkdir(Sync)：创建目录(创建嵌套目录前提是上一级目录已经存在)
    - rmdir(Sync)：删除目录(如果目标目录有孩子是无法删除的)
  - stat：描述文件(包括文件或文件夹)的状态
    - 不存在，就会发生错误 
    - 存在，回调函数第二个参数对象，其中包含文件信息
      - 参数对象调用 isFile 方法可以判断是否是文件
      - 参数对象调用 isDirectory 方法可以判断是否是目录
  - readdir：查看儿子的目录列表，回调第二个参数是所有儿子文件名字数组
  - unlink：删除文件
  - rename：重命名
*/

// const fs = require('fs')
const path = require('path')

/* fs.mkdir('a', function(err){
  console.log('创建成功');
})
 */

/* // 创建目录中的目录 前提是父目录已经存在
fs.mkdir('a/b', function (err) {
  console.log('创建成功');
})
 */

/* // 异步创建多级目录1
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


/* // 异步创建多级目录2
const {
  existsSync
} = require('fs')
const fs = require('fs').promises // 将所有方法promise方法取出 node11之后

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
}) */

/* // 串行删除目录
function rmdir(pathStr, cb) {
  fs.stat(pathStr, function (err, staticObj) {
    if (err) return cb(err)
    if (staticObj.isFile()) {
      fs.unlink(pathStr, cb)
    } else {
      fs.readdir(pathStr, function (err, dirs) {
        dirs = dirs.map(item => path.join(pathStr, item))
        let index = 0

        function step() {
          if (index === dirs.length) return fs.rmdir(pathStr, cb)
          rmdir(dirs[index++], step) // 删除成功后 继续删除 最后删除自己
        }
        step()
      })
    }
  })
}

rmdir('a', function (err) {
  if (err) return console.log(err);
  console.log('删除成功');
}) */

/* // 并行删除目录
function rmdir(pathStr, cb) {
  fs.stat(pathStr, function (err, staticObj) {
    if (err) return cb(err)
    if (staticObj.isFile()) {
      fs.unlink(pathStr, cb)
    } else {
      fs.readdir(pathStr, function (err, dirs) {
        dirs = dirs.map(item => path.join(pathStr, item))
        if (dirs.length === 0) return fs.rmdir(pathStr, cb)
        let i = 0

        function done() {
          if (++i === dirs.length) {
            return fs.rmdir(pathStr, cb)
          }
        }

        for (let i = 0; i < dirs.length; i++) {
          rmdir(dirs[i], done)
        }
      })
    }
  })
}

rmdir('a', function (err) {
  if (err) return console.log(err);
  console.log('删除成功');
}) */


/* // 使用 async await 并行删除
const fs = require('fs').promises

async function rmdir(pathStr) {
  let staticObj = await fs.stat(pathStr)
  if (staticObj.isFile()) {
    return fs.unlink(pathStr)
  } else {
    let dirs = await fs.readdir(pathStr)
    if (dirs.length === 0) return fs.rmdir(pathStr)
    await Promise.all(dirs.map(item => rmdir(path.join(pathStr, item))))
    return fs.rmdir(pathStr)
  }
}

rmdir('a').then(() => {
  console.log('删除成功');
}).catch(err => {
  console.log(err);
}) */

// 串行广度删除
const fs = require('fs').promises

async function rmdir(pathStr) {
  let stack = [pathStr]
  let index = 0
  let currentNode
  while (currentNode = stack[index++]) {
    let stateObj = await fs.stat(currentNode)
    if (stateObj.isDirectory()) {
      let dirs = await fs.readdir(currentNode)
      dirs = dirs.map(item => path.join(currentNode, item))
      stack = [...stack, ...dirs]
    }
  }
  let i = stack.length
  while (i-- > 0) {
    let cur = stack[i]
    let stateObj = await fs.stat(cur)
    if (stateObj.isFile()) {
      await fs.unlink(cur)
    } else {
      await fs.rmdir(cur)
    }
  }
}

rmdir('a').then(() => {
  console.log('删除成功');
}).catch(err => {
  console.log(err);
})

//