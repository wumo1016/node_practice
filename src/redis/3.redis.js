const redis = require('redis')

const client1 = redis.createClient(6379, '127.0.0.1', {
  password: 'wyb'
})

const client2 = redis.createClient(6379, '127.0.0.1', {
  password: 'wyb'
})

// client1.subscribe('a')

// client1.on('message', function (name, data) {
//   console.log(name, data);
// })

// setTimeout(() => {
//   client2.publish('a', 123456)
// }, 2000)

// 批量操作 如果中间某个失败了 还会继续
client1.multi().set('a', 1, redis.print).set('b', 2, redis.print).exec(redis.print)