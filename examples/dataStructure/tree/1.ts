//[{id:1, parentId: 0}, {id:2, parentId:1},{id:3, parentId:1}]把这个数组从顶级分类递归查找子分类，最终构建一个树状数组。结果输出如下[{id:1, parentId: 0,children:[{id:2, parentId:1},{id:3, parentId:1}]}]，parentId为0 的是根节点
interface Tree {
  id: number;
  parentId: number;
  children?: Tree[];
}

const findChild = (node: Tree, target: Tree) => {
  const current = target;
  if (node.parentId === current.id ) {
    current.children ? current.children.push(node) : current.children = [node];
  } else {
    const tree: Tree[] = current.children || [];
    for (let i = 0; i < tree.length; i++) {
      findChild(node, tree[i]);
    }
  }
};

const getTree = (target: Tree[]) => {
  const arr: Tree[] = [target[0]];
  const {length} = target;
  for (let i = 1; i < length; i++) {
    const item = target[i];
    findChild(item, arr[0]);
  }
  return arr;
}

const arr = getTree([{id:1, parentId: 0}, {id:2, parentId:1},{id:3, parentId:1}]);
console.log(arr);