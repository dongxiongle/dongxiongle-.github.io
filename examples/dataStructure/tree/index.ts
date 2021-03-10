import { TreeNode, Tree } from '../module/node';
import { Compare, defaultCompare } from '../../utils/index';
class BinarySearchTree<T> {
  root: TreeNode<T> | null;
  compareFn: Function;
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }
  /**
   * 辅助插入节点
   * @param node 节点
   * @param key 值
   */
  private insertNode(node: TreeNode<T>, key: T) {
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
  /**
   * 插入节点
   * @param key 值
   */
  insert(key: T) {
    if (this.root === null) {
      this.root = new Tree(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  /**
   * 中序递归
   * @param node 节点
   * @param cb 回调
   */
  private inOrderTraverseNode(node: TreeNode<T> | null, cb: Function) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, cb);
      cb(node.key);
      this.inOrderTraverseNode(node.right, cb);
    }
  }
  /**
   * 中序遍历
   * @param callback 回调方法
   */
  inOrderTraverse(callback: Function) {
    this.inOrderTraverseNode(this.root, callback);
  }

  /**
   * 先序递归
   * @param node 节点
   * @param cb 回调方法
   */
  private preOrderTraverseNode(node: TreeNode<T> | null, cb: Function) {
    if (node !== null) {
      cb(node.key);
      this.preOrderTraverseNode(node.left, cb);
      this.preOrderTraverseNode(node.right, cb);
    }
  }

  /**
   * 先序遍历
   * @param callback 回调方法
   */
  preOrderTraverse(callback: Function) {
    this.preOrderTraverseNode(this.root, callback);
  }

  /**
   * 后续递归
   * @param node 节点
   * @param cb 回调方法
   */
  private postOrderTraverseNode(node: TreeNode<T> | null, cb: Function) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, cb);
      this.postOrderTraverseNode(node.right, cb);
      cb(node.key);
    }
  }
  /**
   * 后续遍历
   * @param callback 回调方法
   */
  postOrderTraverse(callback: Function) {
    this.postOrderTraverseNode(this.root, callback);
  }

  /**
   * 查找最小节点
   * @param node 节点
   * @returns 最小节点/最左侧节点
   */
  private minNode(node: null | TreeNode<T>) {
    let current = node;
    while(current !== null && current.left !== null) {
      current = current.left;
    }
    return current;
  }
  /**
   * 最小键
   * @returns 最小节点
   */
  min(): TreeNode<T> | null {
    return this.minNode(this.root);
  }

  /**
   * 查找最大键所在的节点
   * @param node 节点
   * @returns 最大节点
   */
  private maxNode(node: TreeNode<T> | null) {
    let current = node;
    while(current !== null && current.right !== null) {
      current = current.right;
    }
    return current;
  }
  /**
   * 最大键
   * @returns 最大节点/最优侧节点
   */
  max() {
    return this.maxNode(this.root);
  }
  /**
   * 删除节点
   * @param node 节点
   * @param key 键
   * @returns 节点
   */
  removeNode(node: TreeNode<T> | null, key: T): TreeNode<T> | null {
    if (node === null) {
      return null;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THEN) { // 要删除的键在左侧
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) { // 要删除的键在右侧
      node.right = this.removeNode(node.right, key);
      return node;
    } else { // 键等于node.key
      if(node.left === null && node.right === null) { // 没有子节点
        node = null;
        return node;
      }
      if (node.left === null) { // 左节点为null
        node = node.right;
        return node;
      } else if (node.right === null) { // 右节点为null
        node = node.left;
        return node;
      }
      const next: TreeNode<T> = this.minNode(node.right) as TreeNode<T>;
      node.key = next.key;
      node.right = this.removeNode(node.right, next.key);
      return node;
    }
  }
  remove(key: T){
    this.root = this.removeNode(this.root, key);
  }
}

export default BinarySearchTree;
