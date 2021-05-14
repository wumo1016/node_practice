function bodyParse() {
  return async (ctx, next) => {
    // 自己定义一个请求体
    ctx.request.body = await new Promise((r, j) => {
      let arr = []
      ctx.req.on('data', function (chunk) {
        arr.push(chunk)
      })
      ctx.req.on('end', function () { // get请求没有请求体 会直接触发end事件
        r(Buffer.concat(arr))
      })
    })
    await next()
  }
}

module.exports = bodyParse