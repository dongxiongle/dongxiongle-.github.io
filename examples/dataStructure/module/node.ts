export interface TreeNode<T> {
  key: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

export class Tree<T> implements TreeNode<T> {
  key: T;
  left: null;
  right: null;
  constructor(key: T) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}