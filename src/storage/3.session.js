const Koa = require('koa')
const Router = require('koa-router')
const queryString = require('querystring')
const crypto = require('crypto')
const uuid = require('uuid')

const router = new Router()
const app = new Koa()

const session = {}
const cardName = 'connect.sid' // 卡的名字
app.keys = ['wumo']

router.get('/wash', async (ctx, next) => {

  // 第一次洗澡 办卡 得知卡号
  // 第二次自动带上卡即可
  let id = ctx.cookies.get(cardName, {
    signed: true
  })
  if (id && session[id]) {
    session[id].mny -= 20
    ctx.body = `mny ${session[id].mny}`
  } else {
    let cardId = uuid.v4()
    session[cardId] = {
      mny: 500
    }
    ctx.cookies.set(cardName, cardId, {
      signed: true
    })
    ctx.body = `mny 500`
  }
})

app.use(router.routes())

app.listen(3000)