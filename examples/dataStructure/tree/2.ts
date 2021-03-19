// [{id:1, parentId: 0}, {id:2, parentId:1},{id:3, parentId:1}]把这个数组从顶级分类递归查找子分类，最终构建一个树状数组。结果输出如下[{id:1, parentId: 0,children:[{id:2, parentId:1},{id:3, parentId:1}]}]，parentId为0 的是根节点
interface Tree {
  id: number;
  parentId: number;
  children?: Tree[];
}

const getTree2 = (target: Tree[]) => {
  const arr = [];
  const map = new Map;
  target.map(item => map.set(item.id, item));
  for(let i = 0; i < target.length; i++) {
    const node: Tree = target[i];
    if (node.parentId == 0) {
      arr.push(node);
    } else {
      
    }
  }
}

const arr2 = getTree2([{id:1, parentId: 0}, {id:2, parentId:1},{id:3, parentId:1}]);
console.log(arr2);