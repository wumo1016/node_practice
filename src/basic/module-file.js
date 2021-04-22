const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(id) {
  this.id = id
  this.exports = {}
}

Module._cache = {}

Module.prototype.load = function () {
  // 先获取扩展名
  let extname = path.extname(this.id)
  Module._extensions[extname](this)
}

Module._extensions = {
  '.js'(module) {
    let script = fs.readFileSync(module.id, 'utf8')
    let templateFn = `(function(exports, module, require, __driname, __filename){${script}})`
    let fn = vm.runInThisContext(templateFn)
    let exports = module.exports
    let thisValue = exports
    let filename = module.id
    let driname = path.dirname(filename)
    fn.call(thisValue, exports, module, req, driname, filename)
  },
  '.json'(module) {
    let script = fs.readFileSync(module.id, 'utf8')
    module.exports = JSON.parse(script)
  },
}

Module._resolveFilename = function (id) {
  let filePath = path.resolve(__dirname, id)
  const isExist = fs.existsSync(filePath)
  if (isExist) return filePath
  // 尝试添加后缀
  const keys = Reflect.ownKeys(Module._extensions)
  for (let i = 0; i < keys.length; i++) {
    let newPath = filePath + keys[i]
    if (fs.existsSync(newPath)) return newPath
  }
  throw new Error('module is not found')
}

function req(filename) {
  filename = Module._resolveFilename(filename)
  // 如果有缓存 直接返回结果
  let cacheModule = Module._cache[filename]
  if (cacheModule) return cacheModule.exports

  const module = new Module(filename)
  Module._cache[filename] = module
  module.load() // 核心就是给 module.exports 赋值
  return module.exports
}


// const a = require('./a.json')
let a = req('./a')
let b = req('./a')
console.log(a, b);