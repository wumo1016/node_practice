// new Function + with
// const ejs = require('ejs');
const path = require('path');
const pathname = path.resolve(__dirname, './template.html');
const fs = require('fs')
const util = require('util')
const read = util.promisify(fs.readFile);

// 版本1

/* 
<!-- <%=name%> <%=age%> -->
const ejs = {
  async renderFile(pathname, options) {
    let content = await read(pathname, 'utf8')
    content = content.replace(/<%=(.+?)%>/g, function () {
      return options[arguments[1]]
    })
    return content
  }
};
(async function () {
  let r = await ejs.renderFile(pathname, {
    name: 'wyb',
    age: 18
  })
  console.log(r);
})();
 */


const ejs = {
  async renderFile(pathname, options) {
    let content = await read(pathname, 'utf8')
    // 先将 <%=item%> 转换为 ${name}
    content = content.replace(/<%=(.+?)%>/g, function () {
      return '${' + arguments[1] + '}'
    })
    let head = 'let str = "";\n with(obj){\n str +=`'
    let body = content.replace(/<%(.+?)%>/g, function () {
      return '`\n' + arguments[1] + '\n str+=`'
    })
    let tail = '`} \n  return str'
    let fn = new Function('obj', head + body + tail)
    return fn(options)
  }
};
(async function () {
  let r = await ejs.renderFile(pathname, {
    arr: [1, 2, 3]
  })
  console.log(r);
})();
