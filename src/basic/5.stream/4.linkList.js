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

  add(index, ele) {
    if (arguments.length === 1) {
      ele = index
      index = this.size
    }
    if (index === 0) {
      this.head = new Node(ele, this.head)
    } else {
      let prevNode = this._node(index - 1)
      prevNode.next = new Node(ele, prevNode.next)
    }
    this.size++
  }

  remove(index) {
    if (index > this.size - 1) {
      return console.log('超出索引');
    }
    let removeNode
    if (index === 0) {
      removeNode = this.head
      this.head = this.head.next
    } else {
      let prevNode = this._node(index - 1)
      removeNode = prevNode.next
      prevNode.next = prevNode.next.next
    }
    this.size--
    return removeNode
  }

  reverse() {
    /* 递归反转 */
    // function r(head) {
    //   if (head === null || head.next === null) return head // 空链表 / 只有一个值
    //   let newHead = r(head.next)
    //   head.next.next = head
    //   head.next = null
    //   return newHead
    // }
    // return r(this.head)

    /* 循环搬家 */
    let head = this.head
    if (head === null || head.next === null) return head
    let newHead = null
    while (head !== null) { // 如果不是null 就一直搬家
      let temp = head.next // 保留下一个元素
      head.next = newHead // 更新当前元素的指针
      newHead = head // 然新链表的头等于老链表的头
      head = temp // 更新头指针
    }
    return newHead
  }

}
const ll = new LinkList()
ll.add(1)
ll.add(2)
ll.add(3)
ll.add(4)

console.dir(ll, {
  depth: Infinity
});

console.dir(ll.reverse(), {
  depth: Infinity
});




//