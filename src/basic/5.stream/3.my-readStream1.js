const {
  Readable
} = require('stream')

class MyReadStream extends Readable {
  constructor() {
    super()
    this.i = 1
  }
  _read() {
    if (this.i === 5) {
      return this.push(null)
    }
    this.push(this.i++ + 'ok')
  }
}

let ms = new MyReadStream()
ms.on('data', function (data) {
  console.log(data);
})

ms.on('end', function () {
  console.log('end');
})