const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'hello'
  console.log(ctx.req.url);
  console.log(ctx.request.req.url);
  console.log(ctx.request.url);
  console.log(ctx.url);
})

app.listen(3000, () => {
  console.log('server start');
})