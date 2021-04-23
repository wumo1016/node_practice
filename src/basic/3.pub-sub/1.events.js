// const EventEmitter = require('events')
const EventEmitter = require('./2.my-events')
const util = require('util')

function Person() {}

util.inherits(Person, EventEmitter) // 原型继承 只继承原型

let p = new Person()

const fn1 = () => {
  console.log('less1');
}
p.on('less', fn1)

p.on('less', () => {
  console.log('less2');
})

const fn2 = () => {
  console.log('less3');
}
p.once('less', fn2)

setTimeout(() => {
  p.off('less', fn2)
  p.emit('less')
  p.off('less', fn1)
  p.emit('less')
}, 1000)











// Object.create 的原型实现
// function create(proto) {
//   function fn() {}
//   fn.prototype = proto
//   return new fn()
// }

// Person.prototype = Object.create(EventEmitter.prototype)
// Person.prototype.constructor = Person