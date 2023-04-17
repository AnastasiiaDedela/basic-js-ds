const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require("../extensions/list-tree.js")


class BinarySearchTree {
  constructor(){
    this.treeRoot = null
  }

  root() {
    return this.treeRoot
  }

  add(val) {
    if(this.treeRoot == null){
      this.treeRoot = new Node(val)
      return
    }

    let current = this.treeRoot
    while(true){
      if(current.data > val){

        if(current.left != null){
          current = current.left
        }else{
          current.left = new Node(val)
          break
        }

      }else if (current.data < val){
        if(current.right != null){
          current = current.right
        }else {
          current.right = new Node(val)
          break
        }

      } else {
        // both equal
        break
      }
    }
  }

  has(val) {
    if(this.treeRoot == null){
      return false
    }
    let current = this.treeRoot

    while(true){
      if(current.data > val){

        if(current.left != null){
          current = current.left
        }else {
          return false
        }

      }
      else if (current.data < val){
        if(current.right != null){
          current = current.right
        } else {
          return false
        }

      }
      else{
        return true
      }
    }
  }

  find(val) {
    if(this.treeRoot == null){
      return null
    }
    let current = this.treeRoot

    while(true){
      if(current.data > val){

        if(current.left != null){
          current = current.left
        }else {
          return null
        }

      }
      else if (current.data < val){
        if(current.right != null){
          current = current.right
          console.log("two",current.right)
        } else {
          return null
        }
      }
      else{
        return current
      }
    }
  }

  findWithParent(val) {
    if(this.treeRoot == null){
      return null
    }

    let current = this.treeRoot
    let parent = this.treeRoot
    let direction = null

    while(true){
      if(current.data > val){

        if(current.left != null){
          parent = current
          current = current.left
          direction = "left"
        }else {
          return null
        }

      }
      else if (current.data < val){
        if(current.right != null){
          parent = current
          current = current.right
          direction = "right"
          // console.log("two", current.right)
        } else {
          return null
        }
      }
      else{
        return [parent, current, direction]
      }
    }
  }

  removeHelper(deleteParent, elemToDelete, direction){
    let [leftMax, leftMaxParent] = this.maxWithParent(elemToDelete.left)

    if(leftMax !== null && leftMaxParent !== null){
      
      leftMaxParent.right = leftMax.left
      
      if(direction == "right"){
        deleteParent.right = leftMax
      }else if (direction == "left"){
        deleteParent.left = leftMax
      }
    
      leftMax.left = elemToDelete.left
      leftMax.right = elemToDelete.right
    }
    else if (leftMax === null && leftMaxParent !== null){
      if(direction == "right"){
        deleteParent.right = leftMaxParent
      }else if (direction == "left"){
        deleteParent.left = leftMaxParent
      }
      leftMaxParent.right = elemToDelete.right
    }
    else if(leftMax === null && leftMaxParent === null) {
      if(direction == "right"){
        deleteParent.right = elemToDelete.right
      }else if (direction == "left"){
        deleteParent.left = elemToDelete.right
      }
    }
  }

  // remove(val){
  //   if(!this.has(val)){
  //     return
  //   }

  //   let [deleteParent, elemToDelete, direction] = this.findWithParent(val)
  //   if(direction === null){
  //     // want to delete root elem
      
  //     if(!elemToDelete.left && elemToDelete.right){
  //       this.root = elemToDelete.right
  //       return
  //     }else if(!elemToDelete.left && !elemToDelete.right){
  //       this.root = null
  //       return
  //     }else if(elemToDelete.left && !elemToDelete.right){
  //       this.root = elemToDelete.left
  //       return
  //     }else {
  //       this.removeHelper(deleteParent, elemToDelete, direction)
  //     }

  //   }

  //   this.removeHelper(deleteParent, elemToDelete, direction)

  // }

  remove(value){
    this.treeRoot = this.removeNode(this.treeRoot, value)
  }

  removeNode(current, value) {
    if (current === null) {
        return current
    }
    if (value === current.value) {
        if (current.left === null && current.right === null) {
            return null
        } else if (current.left === null) {
            return current.right
        } else if (current.right === null) {
            return current.left
        } else {
            let tempNode = this.minNode(current.right)
            current.value = tempNode.value

            current.right = this.removeNode(current.right, tempNode.value)
            return current
        }
    } else if (value < current.value) {
        current.left = this.removeNode(current.left, value)
        return current
    } else {
        current.right = this.removeNode(current.right, value)
        return current
    }
}
  minNode(node) {
      while(!node.left === null)
        node = node.left

      return node
  }

  min() {
    if(this.treeRoot == null){
      return null
    }

    let current = this.treeRoot
    while(current.left){
      current = current.left
    }
    console.log(current.data)
    return current.data
  }

  max() {
    if(this.treeRoot == null){
      return null
    }

    let current = this.treeRoot
    while(current.right){
      current = current.right
    }
    console.log(current.data)
    return current.data
  }

  maxWithParent(node){
    if (node === null) {
      return [null, null];
    }
    let parent = node;

    if (parent.right === null) {
      return [null, parent];
    }

    let current = parent.right;
    while (current.right) {
      current = current.right;
      parent = parent.right;
    }

    return [current, parent];
  }


}

function depthFirst(node){
  if(node){
    console.log(node.data)
    depthFirst(node.left)
    depthFirst(node.right)
  }
}

const tree = new BinarySearchTree();
tree.add(9);
tree.add(14);
tree.add(2);
tree.add(6);
tree.add(128);
tree.add(8);
tree.add(31);
tree.add(54);
tree.add(1);
tree.remove(14);
tree.remove(8);
tree.remove(9);
depthFirst(tree.treeRoot)
console.log(tree.has(14), false);
console.log(tree.has(8), false);
console.log(tree.has(9), false);
console.log(tree.has(2), true);
console.log(tree.has(6), true);
console.log(tree.has(128), true);
console.log(tree.has(31), true);
console.log(tree.has(54), true);
console.log(tree.has(1), true);

// let tree = new BinarySearchTree()
// let afterRemove = new BinarySearchTree()

// let treeElems = [-3, -5, 4, -6, -4, -1, 6, -2, 3, 5, 8, 1, 7, 0, 2]
// let removedElems = [-3, -5, 3, -6, -4, -1, 6, -2, 5, 8, 1, 7, 0, 2]

// for(let elem of treeElems){
//   tree.add(elem)
// }
// for(let elem of removedElems){
//   afterRemove.add(elem)
// }

// tree.add(9);
// tree.add(14);
// tree.add(2);
// tree.add(6);
// tree.add(128);
// tree.add(8);
// tree.add(31);
// tree.add(54);
// tree.add(1);
// tree.remove(14);
// tree.remove(8);
// tree.remove(9);
// console.log(tree.has(14), false);
// console.log(tree.has(8), false);
// console.log(tree.has(9), false);
// console.log(tree.has(2), true);
// console.log(tree.has(6), true);
// console.log(tree.has(128), true);
// console.log(tree.has(31), true);
// console.log(tree.has(54), true);
// console.log(tree.has(1), true);


module.exports = {
  BinarySearchTree
};
