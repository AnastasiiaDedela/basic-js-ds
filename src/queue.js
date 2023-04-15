const { NotImplementedError, ListNode } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */


class Queue {
  constructor() {
    this.head = null
    this.tail = null

    this.length = 0
  }

  getUnderlyingList() { 
    return this.head
  }

  enqueue(val) {
    let newNode = new ListNode(val)

    if(this.length == 0){
      this.head = newNode
      this.tail = this.head 
    }else{
      this.tail.next = newNode
      this.tail = this.tail.next
    }
    this.length++
  }

  dequeue() {
    if(this.head != null){
      let headValue = this.head.value
      this.head = this.head.next;
      return headValue;
    }
    return null
  }
}

const queue = new Queue();

queue.enqueue(1); // adds the element to the queue
queue.enqueue(3); // adds the element to the queue
let dequed = queue.dequeue(); // returns the top element from queue and deletes it, returns 1
console.log("DEQUED: ", dequed)
let res = queue.getUnderlyingList() // returns { value: 3, next: null }

console.log("RES: ", res)




module.exports = {
  Queue
};






// let arr = [1,2,3,4,5]
// arr.push(value);
// arr.shift()
