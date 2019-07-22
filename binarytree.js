// DFS (DEPTH FIRST SEARCH) -> STACK -> RECURSION

const DFS = (root) => {
  if (!root) return null;
  console.log(root);
  DFS(root.left);
  DFS(root.rigt);
};

const DFSI = (root) => {
  let stack = [root];

  while (stack.length) {
    let node = stack.pop();
    console.log(node);

    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
};

// BFS (BREADTH FIRST SEARCH) -> QUEUE -> ITERATIVE

const BFS = (root) => {
};

const BFSI = (root) => {
  let queue = [root];

  while (queue.length) {
    let node = queue.shift();

    console.log(node);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
};