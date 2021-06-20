const Koa = require('koa')
const Router = require('koa-router')
const queryString = require('querystring')
const crypto = require('crypto')


const router = new Router()
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.req.getCookie = function (key, options) {
    let cookies = ctx.req.headers['cookie']
    let cookieObj = queryString.parse(cookies, '; ', '=')
    if (options.signed) {
      if (cookieObj[key + '.sig'] === sign(`${key}=${cookieObj[key]}`)) {
        return cookieObj[key]
      }
      return ''
    }
    return cookieObj[key] || ''
  }

  let cookieArr = []
  ctx.res.setCookie = function (key, value, options = {}) {
    let str = Object.entries(options).filter(v => v[0] !== 'signed').reduce((memo, cur) => {
      return memo + `;${cur[0]}=${cur[1]}`
    }, '')
    let keyValue = `${key}=${value}`
    if (options.signed) {
      cookieArr.push(`${key}.sig=${sign(keyValue)}`)
    }
    cookieArr.push(`${keyValue}${str}`)
    ctx.res.setHeader('Set-Cookie', cookieArr)
  }
  await next()
})

app.keys = ['wumo']

// base64Url 需要特殊处理 + = /
const sign = (value) => {
  return crypto.createHmac('sha1', app.keys.join('')).update(value).digest('base64').replace(/\+/g, '-').replace(/\//g, '_')
}
// 可以给cookie签名 根据cookie产生一个标识
router.get('/visit', async (ctx, next) => {
  let count = ctx.req.getCookie('visit', {
    signed: true
  }) || 0
  let visitCount = Number(count) + 1
  ctx.res.setCookie('visit', visitCount, {
    signed: true
  })
  ctx.body = `you visit ${visitCount}`

  // koa自带
  // let count = ctx.cookies.get('visit', {
  //   signed: true
  // }) || 0
  // let visitCount = Number(count) + 1
  // ctx.cookies.set('visit', visitCount, {
  //   signed: true
  // })
  // ctx.body = `you visit ${visitCount}`
})

app.use(router.routes())

app.listen(3000)