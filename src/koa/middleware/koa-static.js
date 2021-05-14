const path = require('path')
const fs = require('fs').promises
const mine =  require('mime')

function static(dirname) {
  return async (ctx, next) => {
    let filePath = path.join(dirname, ctx.path)
    // 如果不是文件路径 直接向下处理 如果是直接返回
    try {
      let statObj = await fs.stat(filePath)
      if (statObj.isDirectory()) {
        filePath = path.join(filePath, 'index.html')
      }
      ctx.set('Content-Type', mine.getType(filePath) + ';chartset:utf-8')
      ctx.body = await fs.readFile(filePath)
    } catch (e) {
      console.log(e);
      await next()
    }
  }
}

module.exports = static