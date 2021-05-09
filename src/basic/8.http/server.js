/* http
  - http是node的内置模块 可以直接使用 默认是1.1
  - http内部是基于tcp的net模块 socket双向通信 http1.1是一个半双工的
  - 内部基于socket将其分隔出了request、response 底层还是基于socket
  - 内部采用发布订阅
  - http会增加一些header信息 请求之后需要在
*/

const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  // console.log(req.method);
  // console.log(req.url);
  // console.log(url.parse(req.url)); // 解析url
  // console.log(url.parse(req.url, true)); // 将query解析成对象
  // console.log(req.headers); // 获取请求头 node中所有请求头都是小写的

  // 发送数据 curl --data "a=1" -v http://localhost:3000
  let chunk = []
  req.on('data', function (data) {
    chunk.push(data) // 服务端接收的数据可能是分段传输的 所有需要将数据拼接起来
  })

  req.on('end', function (data) {
    console.log(Buffer.concat(chunk).toString());
  })

  res.statusCode = 333 // 更改浏览器响应状态码 一般不修改
  res.statusMessage = 'my define'

  res.setHeader('MyHeadr', 1)
  res.write('hello')
  res.end() // 写完了 必须要 end => write + close 可以(不写write)直接写end并传数据

})

// server.on('request', function () { // 可以不写 如果写了这个方法会后调
//   console.log('client on2');
// })

server.listen(3000, function () {
  console.log('server start');
})

