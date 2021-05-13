const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  // ctx.response.body = '12456'
  ctx.body = { name: 'wyb' }
  console.log(ctx.response.body);
})

app.listen(3000, () => {
  console.log('server start');
})