const removeElements = (head, val) => {
  if (!head) return head;

  let curr = head.next;
  let prev = head;

  while (curr) {
    if (curr.val !== val) {
      prev = curr;
      curr = curr.next;
    } else {
      prev.next = curr.next;
      curr = curr.next;
    }
  }

  if (head.val === val) return head.next
  return head;
};