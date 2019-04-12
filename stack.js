class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// this.next points to the bottom of the stack

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  push(data) {
    let newNode = new Node(data);

    if (this.top === null) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      let temp = this.top;
      this.top = newNode;
      this.top.next = temp;
    }

    this.length++;
  }

  pop() {
    if (this.bottom === this.top) {
      this.top = null;
      this.bottom = null;
      this.length = 0;
      return;
    } else if (this.top === null) {
      return null;
    }

    let temp = this.top;
    this.top = this.top.next;
    this.length--;
    return temp.data;
  }

  size() {
    return this.length;
  }
}

const myStack = new Stack();
myStack.push(1);
myStack.push(2);
myStack.push(3);
console.log(myStack.size());
myStack.pop();
console.log(myStack.size());
console.log(myStack);