const redis = require('redis')

const client = redis.createClient(6379, '127.0.0.1', {
  password: 'wyb'
})

client.on('error', function (err) {
  console.log(err);
})

client.hset('obj', 'name', 'wyb')
client.hset('obj', 'age', '18')
client.hkeys('obj', function (err, keys) {
  keys.forEach(key => {
    client.hget('obj', key, redis.print)
  })
})
