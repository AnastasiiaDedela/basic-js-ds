const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require("../extensions/list-tree.js")


class BinarySearchTree {
  constructor(){
    this.root = null
  }

  root() {
    return this.root
  }

  add(val) {
    if(this.root == null){
      this.root = new Node(val)
      return
    }

    let current = this.root
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
    if(this.root == null){
      return false
    }
    let current = this.root

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
          console.log("two",current.right)
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
    if(this.root == null){
      return null
    }
    let current = this.root

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

  remove(val) {
    if(this.root == null){
      return null
    }

    let current = this.root
    let parentNode = null
    let move;
    while(current){
      if(current.data > val) {
        move = "left"
        parentNode = current
        current = current.left
      } else if (current.data < val){
        move = "right"
        parentNode = current
        current = current.right
      } else {
        if(current.left == null && current.right == null) {
          if(!parentNode){
            this.root = null
          } else if(current == parentNode.left) {
            parentNode.left = null
          } else {
            parentNode.right = null
          }
          return this.root
        } else if (current.left === null && current.right !== null) {
          parentNode.right = current.right
          return this.root
        } else if (current.left !== null && current.right === null){
          parentNode.left = current.left
          return this.root
        } else if(current.left !== null && current.right !== null){
          let leftSubtree = current.left;
          let rightSubtree = current.right
          let maxLeft = leftSubtree.maxWithParent()
          parentNode.move = maxLeft[0]
          maxLeft[0].left = leftSubtree
          maxLeft[0].right = rightSubtree
          leftSubtree.right = maxLeft[1]
          return this.root
        }
      }
    }
  }

  //remove(val){
    // 1. find element val and it's parent parentOfDeleted and where to go ("right" or "left")
    // 2. got it's parent (left, or right as side), leftSubTree, rightSubTree
    // 3. find max of leftSubTree, and his leftMaxParent
    // 4. parent.side = leftMaxParent; leftMaxParent.left = leftSubTree; leftMaxParent.right =rightSubTree
    
  //}

  min() {
    if(this.root == null){
      return null
    }

    let current = this.root
    while(current.left){
      current = current.left
    }
    console.log(current.data)
    return current.data
  }

  max() {
    if(this.root == null){
      return null
    }

    let current = this.root
    while(current.right){
      current = current.right
    }
    console.log(current.data)
    return current.data
  }

  maxWithParent(){
    if (this.root === null) {
      return null;
    }
    let parent = this.root;

    if (parent.right === null) {
      return [parent, null];
    }

    let current = parent.right;
    while (current.right) {
      current = current.right;
      parent = parent.right;
    }

    return [current, parent];
  }

  
}

let tree = new BinarySearchTree()
tree.add(3)
tree.add(5)
tree.add(1)
tree.add(8)
tree.find(3)




module.exports = {
  BinarySearchTree
};
