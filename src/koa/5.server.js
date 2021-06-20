const Koa = require('koa')
const path = require('path')

// 第三方插件
const bodyParse = require('koa-bodyparser')
const static = require('koa-static')

// 手写插件
// const bodyParse = require('./middleware/body-parse')
// const static = require('./middleware/koa-static')

const app = new Koa()

app.use(bodyParse()) // 中间件函数必须返回一个函数
app.use(static(path.resolve(__dirname, 'public')))
app.use(static(path.resolve(__dirname, 'middleware')))

app.use(async (ctx, next) => {
  if (ctx.method === 'GET' && ctx.path === '/form') {
    ctx.body = `
    <form action="/form" method="post">
      <input type="text" name="username">
      <input type="text" name="password">
      <button>提交</button>
    </form>
    `
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  if (ctx.method === 'POST' && ctx.path === '/form') {
    ctx.set('Content-Type', 'text/plain;chartset:utf-8')
    ctx.body = ctx.request.body
  }
})

app.listen(3000, () => {
  console.log('sever start');
})