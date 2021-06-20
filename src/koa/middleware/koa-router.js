class Layer {
  constructor(method, path, cb) {
    this.method = method
    this.path = path
    this.cb = cb
  }

  match(method, path) {
    return this.method === method && this.path === path
  }
}

class Router {

  constructor() {
    this.stack = []
  }

  get(path, cb) {
    let layer = new Layer('GET', path, cb)
    this.stack.push(layer)
  }

  routes() {
    return async (ctx, next) => {
      let {
        method,
        path
      } = ctx
      let matchLayers = this.stack.filter(layer => layer.match(method, path))
      this.compose(matchLayers, ctx, next)
    }
  }

  compose(matchLayers, ctx, next) {
    function step(i) {
      if (matchLayers.length === i) return next()
      return Promise.resolve(matchLayers[i].cb(ctx, () => step(i + 1)))
    }
    return step(0)
  }
}

module.exports = Router