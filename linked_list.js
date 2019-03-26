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

}

list = new LinkedList();

list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.prepend(0);
console.log(list);