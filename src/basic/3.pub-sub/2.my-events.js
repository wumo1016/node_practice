function EventEmitter() {}

EventEmitter.prototype.on = function (name, cb) {
  if (!this._events) this._events = {}
  if (!this._events[name]) {
    this._events[name] = []
  }
  this._events[name].push(cb)
}

EventEmitter.prototype.emit = function (name, ...args) {
  if (this._events && this._events[name]) {
    this._events[name].forEach(fn => fn(...args))
  }
}

EventEmitter.prototype.off = function (name, fn) {
  if (this._events && this._events[name]) {
    this._events[name] = this._events[name].filter(cb => cb !== fn && cb.l !== fn)
  }
}

EventEmitter.prototype.once = function (name, cb) {
  const fn = (...args) => {
    cb(...args)
    this.off(name, fn)
  }
  fn.l = cb
  this.on(name, fn)
}

module.exports = EventEmitter