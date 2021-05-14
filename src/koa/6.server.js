const Koa = require('koa')
const path = require('path')

// 第三方插件
const bodyParse = require('koa-bodyparser')
const static = require('koa-static')
const Router = require('koa-router')

// 手写插件
// const bodyParse = require('./middleware/body-parse')
// const static = require('./middleware/koa-static')
// const Router = require('./middleware/koa-router')

const app = new Koa()
const router = new Router()

app.use(bodyParse()) // 中间件函数必须返回一个函数
app.use(static(path.resolve(__dirname, 'public')))
app.use(static(path.resolve(__dirname, 'middleware')))

app.use(router.routes())

router.get('/user/add', async (ctx, next) => {
  ctx.body = 'use/add'
})

router.get('/user/remove', async (ctx, next) => {
  console.log('use/remove1');
  ctx.body = 'use/remove1'
  next() // 调用next就走下一个
})

router.get('/user/remove', async (ctx, next) => {
  console.log('use/remove2');
  ctx.body = 'use/remove2'
  next()
})

app.use(function (ctx, next) {
  ctx.body = 'end'
}) 


app.listen(3000, () => {
  console.log('sever start');
})