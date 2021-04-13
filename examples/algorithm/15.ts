// 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function minDiffInBST(root: TreeNode | null) {
  if (!root) {
    return Infinity;
  }
  let min = Infinity;
  let pre = -1;
  const getAll = (root: TreeNode | null) => {
    if (!root) {
      return;
    }
    getAll(root.left)
    if (pre != -1) {
      min = Math.min(min, root.val - pre);
    }
    pre = root.val;
    getAll(root.right);
  }
  getAll(root);
  return min;
}
