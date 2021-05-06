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

      /* // 递归写法
      function test(node) {
        if (ele > node.ele) {
          if (node.right === null) {
            return node
          } else {
            return test(node.right)
          }
        } else {
          if (node.left === null) {
            return node
          } else {
            return test(node.left)
          }
        }
      }
      currentNode = test(currentNode)
      if (ele > currentNode.ele) {
        currentNode.right = new Node(ele, currentNode)
      } else {
        currentNode.left = new Node(ele, currentNode)
      } */
    }
  }
}

let tree = new Tree();
[10, 8, 19, 6, 15, 22, 20].forEach(item => {
  tree.add(item)
})

console.dir(tree, {
  depth: Infinity
});