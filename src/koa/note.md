## express和koa对比
  - express源码是es5+ koa源码es6
  - express内置了很多功能 koa内部很小巧，但是可以通过插件进行扩展
  - express和koa都可以自己实现mvc功能 没有约束
  - express处理异步都是回调函数 koa都是async+await

## ctx中的重要属性
  - req：原生
  - res：原生
  - request：扩展的 对原生req进行的一层抽象
  - response：扩展的 对原生res进行的一层抽象
  - app：当前实例 可以扩展公共方法