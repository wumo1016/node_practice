/*- 二叉树遍历
    - 先序：遇到节点就处理节点 再继续处理左边 左边树处理完后 再处理右边
    - 中序：先处理左边 再处理中间 再处理右边
    - 后序：先处理左边 再处理右边 再处理中间 
    - 层序：一层一层的遍历
  - 二叉树反转
*/

class Node {
  constructor(ele, parent = null) {
    this.ele = ele
    this.parent = parent
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor() {
    this.root = null
  }

  add(ele) {
    if (this.root === null) {
      this.root = new Node(ele)
    } else {
      let currentNode = this.root,
        parent, compare
      while (currentNode) {
        compare = ele > currentNode.ele
        parent = currentNode
        if (compare) {
          currentNode = currentNode.right
        } else {
          currentNode = currentNode.left
        }
      }
      let node = new Node(ele, parent)
      if (compare) {
        parent.right = node
      } else {
        parent.left = node
      }
    }
  }

  preorderTraversal() { // 先序
    function traversal(node) {
      if (node === null) return
      console.log(node.ele);
      traversal(node.left)
      traversal(node.right)
    }
    traversal(this.root)
  }

  inorderTraversal() { // 中序
    function traversal(node) {
      if (node === null) return
      traversal(node.left)
      console.log(node.ele);
      traversal(node.right)
    }
    traversal(this.root)
  }

  postOrderTraversal() { // 后序
    function traversal(node) {
      if (node === null) return
      traversal(node.left)
      traversal(node.right)
      console.log(node.ele);
    }
    traversal(this.root)
  }

  levelOrderTraversal(cb) { // 层序
    let stack = [this.root],
      index = 0,
      currentNode;
    while (currentNode = stack[index++]) {
      // console.log(currentNode.ele);
      cb(currentNode)
      if (currentNode.left) {
        stack.push(currentNode.left)
      }
      if (currentNode.right) {
        stack.push(currentNode.right)
      }
    }
  }

  reverse() {
    let stack = [this.root],
      index = 0,
      currentNode;
    while (currentNode = stack[index++]) {
      let temp = currentNode.left
      currentNode.left = currentNode.right
      currentNode.right = temp
      if (currentNode.left) {
        stack.push(currentNode.left)
      }
      if (currentNode.right) {
        stack.push(currentNode.right)
      }
    }
  }
}

let tree = new Tree();
[10, 8, 19, 6, 15, 22, 20].forEach(item => {
  tree.add(item)
})

// tree.preorderTraversal()
// tree.inorderTraversal()
// tree.postOrderTraversal()
// tree.levelOrderTraversal((node) => {
//   console.log(node.ele);
// })

tree.reverse()
console.dir(tree, {
  depth: Infinity
});