function horizontalDistanceBST(root, target) {
  let result = 0;
  if (!root) return false;

  function _recurse(root) {
    if (root.val === target) return;

    if (target < root.val) {
      result--;
      _recurse(root.left)
    } else {
      result++;
      _recurse(root.right);
    }
  }

  _recurse(root)
  return result;
}