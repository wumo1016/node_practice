const Koa = require('koa')

const app = new Koa()
// const bodyParse = require('./middleware/body-parse')
const bodyParse = require('koa-bodyparser') // 第三方插件

app.use(bodyParse()) // 中间件函数必须返回一个函数

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