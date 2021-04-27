/* 链表
  - 添加
    - 创建一个新节点 将头指向当前节点
    - 上一个节点的next指向当前节点
 */



class Node {
  constructor(ele, next) {
    this.ele = ele // 储存的数据
    this.next = next // 储存的是下一个元素的指针
  }
}

// add remove set get
class LinkList {
  constructor() {
    this.head = null
    this.size = 0
  }

  _node(index) { // 通过索引找节点
    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current.next
    }
    return current
  }

  add(ele) {
    let head = this.head
    if (this.size === 0) {
      this.head = new Node(ele, head)
    } else {
      let prevNode = this._node(this.size - 1)
      prevNode.next = new Node(ele, prevNode.next)
    }
    this.size++
  }
}

const ll = new LinkList()
ll.add(1)
ll.add(2)
ll.add(3)
ll.add(4)
ll.add(5)
console.dir(ll, {
  depth: 100
});





//