def horizontalDistance(root, target):
  distance = 0
  if not root:
    return None

  def _recurse(root):
    if root.val == target:
      return

    if target < root.val:
      distance -= 1
      _recurse(root.left)
    else:
      distance += 1
      _recurse(root.right)
  
  _recurse(root)
  return distance


def hd(root, target, dist=0):
    if not root:
      return None

    if root.val == target:
      return dist

    if target < root.val:
      return hd(root.left, target, dist - 1)
    else:
      return hd(root.right, target, dist + 1)

    return None