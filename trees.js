// Graph (tree)
// Every tree is a graph, but not every graph is a tree
// Trees cannot contain cycles (must have hierarchy - parent child relationship)

// Binary tree at it's worst case degrades to a linked list

//     o
//    /
//   o
//  /
// o

// Binary Search Tree - At most 2 children, has no cycyles, and all
// values to the left must be less than currnet node or sibling (search part)

// Search Tree - tree where given any node all values in
// the left subtree are less than root, and all values on
// the right are greater or equal 

// log n time (aka balanced tree)

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }

}

// by default i have an empty tree - which is still a tree

class BST {
  constructor() {
    this.root = null;
  }

  insert(val, root=this.root) {
    // if tree is empty, then set the abs root to the val
    if (this.root === null) {
      this.root = new Node(val);
      return;
    }

    // if the val is less, go left; otherwise go right
    if (val < root.val) {
      // if the left tree is empty, then add
      if (root.left === null) {
        root.left = new Node(val);
      } else {
        // otherwise not empty, so travel to the left subtree and insert tree
        this.insert(val, root.left);
      }
    } else {
      if (root.right === null) {
        // if the right tree is empty, then add
        root.right = new Node(val);
      } else {
        // otherwise not empty, so travel to the right subtree and insert tree
        this.insert(val, root.right);
      }
    }
  }
  

  inOrderPrint(root=this.root) {
    // don't print anyhting in case it's an empty tree (base case!)
    if (root === null) return;

    this.inOrderPrint(root.left);
    console.log(root.val);
    this.inOrderPrint(root.right);
  }

  // Balanced Tree
  // - given the root of a tree
  //  - the left subtrees and right subtrees MUST
  //     differ in height by at most 1
  //  - AND the left subtree is balanced
  //  - AND the right subtree is balanced
  //      (this check is recursive)
  // - empty tree has a height of -1

  height(root=this.root) {
    if (root === null) return -1;
    let leftH = this.height(root.left);
    let rightH = this.height(root.right);
    return Math.max(leftH, rightH) + 1;
  }
}

// Binary Search Tree (BST) - must be recursive (*)
// - given the root of a tree
//  - all vals in the left subtree are <
//  - all vals in the right subtree are >=
//  - * AND the left subtree is a BST
//  - * AND the right subtree is a BST
//  - * an empty tree is a BST (base case)


const tree = new BST();
// insertion order matters
tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);
tree.insert(17);
tree.insert(17);
console.log(tree.root);

tree.inOrderPrint();

// run node Trees.js to test



// PART 2

