/* cookie
  - name：键
  - value：值
  - domain：针对哪个域名生效 可以跨子域和父域 
  - path：当什么路径的时候可以访问cookie 以path开头的时候才能读取到
  - expries/max-age：cookie的存活时间
  - httpOnly：浏览器无法通过代码获取
  - secure：只能在https下生效
  - samesite：防止XSS等攻击
  - priority：优先级
*/
const Koa = require('koa')
const Router = require('koa-router')
const queryString = require('querystring')

const router = new Router()
const app = new Koa()

app.use(async (ctx, next) => {

  ctx.req.getCookie = function (key) {
    let cookies = ctx.req.headers['cookie']
    let cookieObj = queryString.parse(cookies, '; ', '=')
    return cookieObj[key] || ''
  }

  let cookieArr = []
  ctx.res.setCookie = function (key, value, options = {}) {
    let str = Object.entries(options).reduce((memo, cur) => {
      return memo + `;${cur[0]}=${cur[1]}`
    }, '')
    cookieArr.push(`${key}=${value}${str}`)
    ctx.res.setHeader('Set-Cookie', cookieArr)
  }
  await next()
})

router.get('/read', async (ctx, next) => {
  // ctx.body = ctx.req.headers['cookie'] || 'ok'
  // ctx.body = ctx.req.getCookie('name') || 'ok'
  ctx.body = ctx.cookies.get('name') || 'ok'
})

router.get('/write', async (ctx, next) => {
  // ctx.res.setHeader('Set-Cookie', 'name=wyb')
  // ctx.res.setHeader('Set-Cookie', ['name=wyb', 'age=11']) // 设置多个cookie
  // ctx.res.setHeader('Set-Cookie', ['name=wyb;domain=.wumo.com']) // 表示wumo.com下的域名的都可以访问
  // ctx.res.setHeader('Set-Cookie', ['name=wyb;max-age=10']) // 表示10s后过期 会被清空
  // ctx.res.setHeader('Set-Cookie', ['name=wyb;httpOnly=true']) // 表示前端无法通过代码读取也无法设置

  // ctx.res.setCookie('name', 'wyb', {
  //   domain: '.wumo.com',
  //   httpOnly: true
  // })

  ctx.cookies.set('name', 'wyb', {
    domain: '.wumo.com',
    httpOnly: true
  })

  ctx.body = 'write'
})

app.use(router.routes())

app.listen(3000)