import { TreeNode, Tree } from '../module/node';
import { Compare, defaultCompare } from '../../utils/index';
export class BinarySearchTree<T> {
  root: TreeNode<T> | null;
  compareFn: Function;
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }
  insertNode(node: TreeNode<T>, key: T) {
    if (this.compareFn(key, node.key) === Compare.LESS_THEN) {
      node.left === null
        ? (node.left = new Tree(key))
        : this.insertNode(node.left, key);
    } else {
      node.right === null
        ? (node.right = new Tree(key))
        : this.insertNode(node.right, key);
    }
  }
  // 插入节点
  insert(key: T) {
    if (this.root === null) {
      this.root = new Tree(key);
    } else {
      this.insertNode(this.root, key);
    }
  }
}
