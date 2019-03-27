class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    if (this.head === null) {
      this.head = new Node(data);
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    current.next = new Node(data);
  }


  prepend(data) {
    let newHead = new Node(data);

    if (this.head === null) {
      this.head = newHead;
      return;
    }

    newHead.next = this.head;
    this.head = newHead;
  }

  remove(data) {
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let previous = this.head;
    let current = this.head.next;

    while (current) {
      if (current.data !== data) {
        previous = previous.next;
        current = current.next;
      } else {
        previous.next = current.next;
        return;
      }
    }
  }

  find(data) {
    if (this.head.data === data) {
      return this.head;
    }

    let current = this.head.next;
    while (current) {
      if (current.data === data) {
        return current;
      } else {
        current = current.next;
      }
    }
  }

}

list = new LinkedList();

list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.prepend(0);
list.remove(1);
list.remove(2);
console.log(list.find(9));
console.log(list);